import express from 'express'
import { authMiddleware } from '../../middleware/auth.middleware'
import { validateRequest } from '../../middleware/validateRequest'
import { createCommentSchema, updateCommentSchema } from './comment.schemas'
import {
    createComment,
    getCommentsByReview,
    updateComment,
    deleteComment
} from './comment.controller'

const router = express.Router()

// Protect all comment routes with authentication
router.use(authMiddleware)

router.post('/', validateRequest(createCommentSchema), createComment)
router.get('/review/:reviewId', getCommentsByReview)
router.put('/:id', validateRequest(updateCommentSchema), updateComment)
router.delete('/:id', deleteComment)

export default router