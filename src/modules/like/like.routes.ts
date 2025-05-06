import express from 'express'
import { authMiddleware } from '../../middleware/auth.middleware'
import { validateRequest } from '../../middleware/validateRequest'
import { createLikeSchema, likeParamsSchema } from './like.schemas'
import {
    getLikesByReview,
    getMyLikes,
    getLikeStatus,
    toggleLike,
    getLikesCount
} from './like.controller'

const router = express.Router()

// Protect all like routes
router.use(authMiddleware)

// Get likes for a review
router.get('/review/:reviewId', validateRequest(likeParamsSchema), getLikesByReview)

// Get my likes
router.get('/me', getMyLikes)

// Get like status for a review
router.get('/status/:reviewId', validateRequest(likeParamsSchema), getLikeStatus)

// Get likes count for a review
router.get('/count/:reviewId', validateRequest(likeParamsSchema), getLikesCount)

// Toggle like
router.post('/toggle', validateRequest(createLikeSchema), toggleLike)

export default router