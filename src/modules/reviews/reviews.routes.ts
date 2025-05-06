import express from 'express'
import { authMiddleware } from '../../middleware/auth.middleware'
import { validateRequest } from '../../middleware/validateRequest'
import {
    createReviewSchema,
    updateReviewSchema,
    reviewParamsSchema
} from './reviews.schemas'
import {
    getAllReviews,
    getReviewById,
    getReviewsByMovie,
    getMyReviews,
    createReview,
    updateReview,
    deleteReview
} from './reviews.controller'

const router = express.Router()

// Protect all review routes
router.use(authMiddleware)

// Get all reviews and create new review
router.get('/', getAllReviews)
router.post('/', validateRequest(createReviewSchema), createReview)

// Get reviews for a specific movie
router.get('/movie/:movieId', validateRequest(reviewParamsSchema), getReviewsByMovie)

// Get my reviews
router.get('/me', getMyReviews)

// Get, update and delete specific review
router.get('/:id', validateRequest(reviewParamsSchema), getReviewById)
router.put('/:id', validateRequest(updateReviewSchema), updateReview)
router.delete('/:id', validateRequest(reviewParamsSchema), deleteReview)

export default router