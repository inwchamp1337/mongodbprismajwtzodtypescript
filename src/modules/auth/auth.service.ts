import prisma from '../../prisma/prisma.client'
import { hashPassword, comparePassword } from '../../utils/bcrypt.utils'
import { generateToken } from '../../utils/jwt.utils'
import { RegisterInput } from './auth.schemas'

export const register = async (data: RegisterInput) => {
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: data.email },
                    { username: data.username }
                ]
            }
        })
        if (existingUser) {
            throw new Error('Email or username already exists')
        }
        const birthday =
            data.profile.birthday instanceof Date
                ? data.profile.birthday
                : new Date(data.profile.birthday)

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
                        birthday
                    }
                }
            },
            include: { profile: true }
        })

        const token = generateToken(user.id)
        const { password, ...userWithoutPassword } = user
        return { user: userWithoutPassword, token }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Registration failed: ${error.message}`)
        }
        throw new Error('Registration failed: Unknown error')
    }
}
export const login = async (email: string, password: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                profile: true
            }
        })

        if (!user) {
            throw new Error('Invalid email or password')
        }

        const isPasswordValid = await comparePassword(password, user.password)
        if (!isPasswordValid) {
            throw new Error('Invalid email or password')
        }

        const { password: _, ...userWithoutPassword } = user
        const token = generateToken(user.id)

        return { user: userWithoutPassword, token }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Login failed: ${error.message}`)
        }
        throw new Error('Login failed: Unknown error')
    }
}