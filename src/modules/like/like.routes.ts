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

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         reviewId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/likes/review/{reviewId}:
 *   get:
 *     summary: Get all likes for a review
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of likes for the review
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Like'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/likes/me:
 *   get:
 *     summary: Get all likes by current user
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's likes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Like'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/likes/status/{reviewId}:
 *   get:
 *     summary: Check if user has liked a review
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isLiked:
 *                   type: boolean
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/likes/count/{reviewId}:
 *   get:
 *     summary: Get total likes count for a review
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Likes count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/likes/toggle:
 *   post:
 *     summary: Toggle like status for a review
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reviewId
 *             properties:
 *               reviewId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Like status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isLiked:
 *                   type: boolean
 *                 like:
 *                   $ref: '#/components/schemas/Like'
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid input
 */

// Protect all like routes
router.use(authMiddleware)

// Routes
router.get('/review/:reviewId', validateRequest(likeParamsSchema), getLikesByReview)
router.get('/me', getMyLikes)
router.get('/status/:reviewId', validateRequest(likeParamsSchema), getLikeStatus)
router.get('/count/:reviewId', validateRequest(likeParamsSchema), getLikesCount)
router.post('/toggle', validateRequest(createLikeSchema), toggleLike)

export default router