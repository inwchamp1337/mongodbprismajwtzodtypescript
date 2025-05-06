import express from 'express'
import { authMiddleware } from '../../middleware/auth.middleware'
import { validateRequest } from '../../middleware/validateRequest'
import {
    createMovieSchema,
    updateMovieSchema,
    movieParamsSchema
} from './movies.schemas'
import {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
} from './movies.controller'

const router = express.Router()

// Protect all movie routes
router.use(authMiddleware)

// Routes
router.get('/', getAllMovies)
router.get('/:id', validateRequest(movieParamsSchema), getMovieById)
router.post('/', validateRequest(createMovieSchema), createMovie)
router.put('/:id', validateRequest(updateMovieSchema), updateMovie)
router.delete('/:id', validateRequest(movieParamsSchema), deleteMovie)

export default router