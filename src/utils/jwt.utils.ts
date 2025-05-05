import jwt from 'jsonwebtoken'
import { config } from '../config'

export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, config.JWT_SECRET, {
        expiresIn: '1h'
    })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, config.JWT_SECRET)
}