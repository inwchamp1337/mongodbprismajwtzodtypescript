"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validateRequest_1 = require("../../middleware/validateRequest");
const like_schemas_1 = require("./like.schemas");
const like_controller_1 = require("./like.controller");
const router = express_1.default.Router();
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
router.use(auth_middleware_1.authMiddleware);
// Routes
router.get('/review/:reviewId', (0, validateRequest_1.validateRequest)(like_schemas_1.likeParamsSchema), like_controller_1.getLikesByReview);
router.get('/me', like_controller_1.getMyLikes);
router.get('/status/:reviewId', (0, validateRequest_1.validateRequest)(like_schemas_1.likeParamsSchema), like_controller_1.getLikeStatus);
router.get('/count/:reviewId', (0, validateRequest_1.validateRequest)(like_schemas_1.likeParamsSchema), like_controller_1.getLikesCount);
router.post('/toggle', (0, validateRequest_1.validateRequest)(like_schemas_1.createLikeSchema), like_controller_1.toggleLike);
exports.default = router;
