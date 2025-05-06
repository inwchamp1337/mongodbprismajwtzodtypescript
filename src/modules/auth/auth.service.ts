import prisma from '../../prisma/prisma.client'
import { hashPassword, comparePassword } from '../../utils/bcrypt.utils'
import { generateToken } from '../../utils/jwt.utils'

export const register = async (data: {
    email: string
    password: string
    username: string
    profile: {
        fullName: string
        avatarUrl?: string
        bio?: string
        birthday: Date
    }
}) => {
    const hashedPassword = await hashPassword(data.password)

    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            username: data.username,
            profile: {
                create: {
                    fullName: data.profile.fullName,
                    avatarUrl: data.profile.avatarUrl || '',
                    bio: data.profile.bio || '',
                    birthday: data.profile.birthday
                }
            }
        },
        include: {
            profile: true
        }
    })

    const { password, ...userWithoutPassword } = user
    const token = generateToken(user.id)

    return { user: userWithoutPassword, token }
}

export const login = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            profile: true
        }
    })

    if (!user) {
        throw new Error('Invalid credentials')
    }

    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) {
        throw new Error('Invalid credentials')
    }

    const { password: _, ...userWithoutPassword } = user
    const token = generateToken(user.id)

    return { user: userWithoutPassword, token }
}