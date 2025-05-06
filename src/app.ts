import express from 'express'
import authRouter from './modules/auth/auth.routes'
import { errorHandler } from './middleware/errorHandler'
import movieRouter from './modules/movies/movies.routes'
const app = express()

// Middleware
app.use(express.json())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/movies', movieRouter)
// Error Handling
app.use(errorHandler)

export default app