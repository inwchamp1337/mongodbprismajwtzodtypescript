// src/services/auth.service.ts
import prisma from '../../prisma/prisma.client'
import { hashPassword, comparePassword } from '../../utils/bcrypt.utils'
import { generateToken } from '../../utils/jwt.utils'

export const registerUser = async (email: string, password: string, username: string) => {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
        throw new Error('EMAIL_EXISTS')
    }

    const hashedPassword = hashPassword(password)

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            username
        }
    })

    const token = generateToken(user.id)
    return { user, token }
}

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        throw new Error('INVALID_CREDENTIALS')
    }

    const isMatch = comparePassword(password, user.password)
    if (!isMatch) {
        throw new Error('INVALID_CREDENTIALS')
    }

    const token = generateToken(user.id)
    return { user, token }
}
