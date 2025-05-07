import { Request, Response } from 'express'
import * as authService from './auth.service'

export const register = async (req: Request, res: Response) => {
    try {
        const { user, token } = await authService.register(req.body)
        res.status(201).json({
            success: true,
            data: {
                user,
                token
            }
        })
    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: 'Registration failed'
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const { user, token } = await authService.login(email, password)
        res.json({
            success: true,
            data: {
                user,
                token
            }
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        })
    }
}