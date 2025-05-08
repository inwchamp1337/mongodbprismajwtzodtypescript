import { Request, Response } from 'express'
import * as authService from './auth.service'
import { RegisterInput } from './auth.schemas'

export const register = async (
    req: Request<{}, {}, RegisterInput>,
    res: Response
) => {
    try {
        const { user, token } = await authService.register(req.body)
        res.status(201).json({
            success: true,
            data: { user, token }
        })
    } catch (error: any) {
        if (error.message?.includes('exists')) {
            return res.status(409).json({
                success: false,
                message: error.message
            })
        }
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