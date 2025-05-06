import { Request, Response } from 'express'
import * as commentService from './comment.service'

export const getAllComments = async (req: Request, res: Response) => {
    try {
        const comments = await commentService.getAllComments()
        res.json({
            success: true,
            data: comments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch comments'
        })
    }
}

export const getCommentsByReview = async (req: Request, res: Response) => {
    try {
        const comments = await commentService.getCommentsByReview(req.params.reviewId)
        res.json({
            success: true,
            data: comments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch comments'
        })
    }
}

export const getCommentById = async (req: Request, res: Response) => {
    try {
        const comment = await commentService.getCommentById(req.params.id)
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            })
        }
        res.json({
            success: true,
            data: comment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch comment'
        })
    }
}

export const createComment = async (req: Request, res: Response) => {
    try {
        const comment = await commentService.createComment({
            ...req.body,
            userId: req.userId!
        })
        res.status(201).json({
            success: true,
            data: comment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create comment'
        })
    }
}

export const updateComment = async (req: Request, res: Response) => {
    try {
        const comment = await commentService.updateComment(
            req.params.id,
            req.userId!,
            req.body
        )
        res.json({
            success: true,
            data: comment
        })
    } catch (error: any) {
        if (error.message === 'Comment not found or unauthorized') {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }
        res.status(500).json({
            success: false,
            message: 'Failed to update comment'
        })
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        await commentService.deleteComment(req.params.id, req.userId!)
        res.json({
            success: true,
            message: 'Comment deleted successfully'
        })
    } catch (error: any) {
        if (error.message === 'Comment not found or unauthorized') {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }
        res.status(500).json({
            success: false,
            message: 'Failed to delete comment'
        })
    }
}