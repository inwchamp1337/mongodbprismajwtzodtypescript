import express from 'express'
import { authMiddleware } from '../../middleware/auth.middleware'
import { validateRequest } from '../../middleware/validateRequest'
import { createReviewSchema, updateReviewSchema } from './reviews.schemas'
import {
    createReview,
    getMovieReviews,
    getUserReviews,
    updateReview,
    deleteReview
} from './reviews.controller'

const router = express.Router()

// Protect all review routes with authentication
router.use(authMiddleware)

router.post('/', validateRequest(createReviewSchema), createReview)
router.get('/movie/:movieId', getMovieReviews)
router.get('/user', getUserReviews)
router.put('/:id', validateRequest(updateReviewSchema), updateReview)
router.delete('/:id', deleteReview)

export default router