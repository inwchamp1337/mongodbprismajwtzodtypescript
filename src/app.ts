import express from 'express'
import authRouter from './modules/auth/auth.routes'
import { errorHandler } from './middleware/errorHandler'

const app = express()

// Middleware
app.use(express.json())

// Routes
app.use('/api/auth', authRouter)

// Error Handling
app.use(errorHandler)

export default app