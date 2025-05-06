import { Request, Response } from 'express'
import * as commentService from './comment.service'

export const createComment = async (req: Request, res: Response) => {
    try {
        const comment = await commentService.createComment({
            userId: req.userId!, // From auth middleware
            reviewId: req.body.reviewId,
            content: req.body.content
        })
        res.status(201).json({ success: true, data: comment })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create comment' })
    }
}

export const getCommentsByReview = async (req: Request, res: Response) => {
    try {
        const comments = await commentService.getCommentsByReview(req.params.reviewId)
        res.json({ success: true, data: comments })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch comments' })
    }
}

export const updateComment = async (req: Request, res: Response) => {
    try {
        const comment = await commentService.updateComment(req.params.id, req.userId!, {
            content: req.body.content
        })
        res.json({ success: true, data: comment })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update comment' })
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        await commentService.deleteComment(req.params.id, req.userId!)
        res.json({ success: true, message: 'Comment deleted successfully' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete comment' })
    }
}