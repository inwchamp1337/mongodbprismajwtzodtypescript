import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    if (err.name === 'ZodError') {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: err.errors
        })
    }

    res.status(statusCode).json({
        success: false,
        message
    })
}