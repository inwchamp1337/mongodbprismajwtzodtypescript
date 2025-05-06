import { Request, Response } from 'express'
import * as likeService from './like.service'

export const getLikesByReview = async (req: Request, res: Response) => {
    try {
        const likes = await likeService.getLikesByReview(req.params.reviewId)
        res.json({
            success: true,
            data: likes
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch likes'
        })
    }
}

export const getMyLikes = async (req: Request, res: Response) => {
    try {
        const likes = await likeService.getLikesByUser(req.userId!)
        res.json({
            success: true,
            data: likes
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch likes'
        })
    }
}

export const getLikeStatus = async (req: Request, res: Response) => {
    try {
        const isLiked = await likeService.getLikeStatus(req.params.reviewId, req.userId!)
        res.json({
            success: true,
            data: { isLiked }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to check like status'
        })
    }
}

export const toggleLike = async (req: Request, res: Response) => {
    try {
        const { reviewId } = req.body
        const isLiked = await likeService.getLikeStatus(reviewId, req.userId!)

        if (isLiked) {
            await likeService.deleteLike(reviewId, req.userId!)
            res.json({
                success: true,
                message: 'Like removed successfully',
                data: { isLiked: false }
            })
        } else {
            const like = await likeService.createLike({
                reviewId,
                userId: req.userId!
            })
            res.json({
                success: true,
                message: 'Review liked successfully',
                data: { isLiked: true, like }
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to toggle like'
        })
    }
}

export const getLikesCount = async (req: Request, res: Response) => {
    try {
        const count = await likeService.getLikesCount(req.params.reviewId)
        res.json({
            success: true,
            data: { count }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get likes count'
        })
    }
}