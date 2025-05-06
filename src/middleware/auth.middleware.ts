import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt.utils'

declare global {
    namespace Express {
        interface Request {
            userId?: string
        }
    }
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' })
        }

        const decoded = verifyToken(token) as { userId: string }
        req.userId = decoded.userId
        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' })
    }
}