import { Request, Response } from 'express'
import prisma from '../../prisma/prisma.client'
import { hashPassword, comparePassword } from '../../utils/bcrypt.utils'
import { generateToken } from '../../utils/jwt.utils'

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body

        // Check existing user
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' })
        }

        // Hash password
        const hashedPassword = hashPassword(password)

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username
            }
        })

        // Generate JWT
        const token = generateToken(user.id)

        res.status(201).json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
                token
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Registration failed' })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        // Find user
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        // Compare password
        const isMatch = comparePassword(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        // Generate JWT
        const token = generateToken(user.id)

        res.json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
                token
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Login failed' })
    }
}