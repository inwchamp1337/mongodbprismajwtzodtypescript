import express from 'express'
import { authMiddleware } from '../../middleware/auth.middleware'
import { validateRequest } from '../../middleware/validateRequest'
import {
    createCommentSchema,
    updateCommentSchema,
    commentParamsSchema
} from './comment.schemas'
import {
    getAllComments,
    getCommentsByReview,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
} from './comment.controller'

const router = express.Router()

// Protect all comment routes
router.use(authMiddleware)

// Get all comments
router.get('/', getAllComments)

// Get comments for a specific review
router.get('/review/:reviewId', getCommentsByReview)

// Get specific comment
router.get('/:id', validateRequest(commentParamsSchema), getCommentById)

// Create new comment
router.post('/', validateRequest(createCommentSchema), createComment)

// Update comment
router.put('/:id', validateRequest(updateCommentSchema), updateComment)

// Delete comment
router.delete('/:id', validateRequest(commentParamsSchema), deleteComment)

export default router