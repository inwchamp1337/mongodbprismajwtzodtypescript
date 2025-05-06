import express from 'express'
import authRouter from './modules/auth/auth.routes'
import movieRouter from './modules/movies/movies.routes'
import reviewRouter from './modules/reviews/reviews.routes'
import commentRouter from './modules/comment/comment.routes'
import { errorHandler } from './middleware/errorHandler'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger/swagger.json'

const app = express()

// Middleware
app.use(express.json())

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Routes
app.use('/api/auth', authRouter)
app.use('/api/movies', movieRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/comments', commentRouter)
// Error Handling
app.use(errorHandler)

export default app