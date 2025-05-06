// src/controllers/auth.controller.ts
import { Request, Response } from 'express'
import { registerUser, loginUser } from './auth.service'

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body
        const { user, token } = await registerUser(email, password, username)

        res.status(201).json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
                token
            }
        })
    } catch (error: any) {
        if (error.message === 'EMAIL_EXISTS') {
            return res.status(409).json({ message: 'Email already exists' })
        }
        res.status(500).json({ message: 'Registration failed' })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const { user, token } = await loginUser(email, password)

        res.json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
                token
            }
        })
    } catch (error: any) {
        if (error.message === 'INVALID_CREDENTIALS') {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        res.status(500).json({ message: 'Login failed' })
    }
}
