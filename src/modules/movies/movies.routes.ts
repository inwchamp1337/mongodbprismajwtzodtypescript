import express from 'express'
import { authMiddleware } from '../../middleware/auth.middleware'
import { validateRequest } from '../../middleware/validateRequest'
import { createMovieSchema, updateMovieSchema } from './movies.schemas'
import {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie
} from './movies.controller'

const router = express.Router()

// Protect all movie routes with authentication
router.use(authMiddleware)

router.post('/', validateRequest(createMovieSchema), createMovie)
router.get('/', getAllMovies)
router.get('/:id', getMovieById)
router.put('/:id', validateRequest(updateMovieSchema), updateMovie)
router.delete('/:id', deleteMovie)

export default router