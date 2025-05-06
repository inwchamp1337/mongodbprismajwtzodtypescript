import { Request, Response } from 'express'
import * as reviewService from './reviews.service'

export const getAllReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await reviewService.getAllReviews()
        res.json({
            success: true,
            data: reviews
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reviews'
        })
    }
}

export const getReviewById = async (req: Request, res: Response) => {
    try {
        const review = await reviewService.getReviewById(req.params.id)
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            })
        }
        res.json({
            success: true,
            data: review
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch review'
        })
    }
}

export const getReviewsByMovie = async (req: Request, res: Response) => {
    try {
        const reviews = await reviewService.getReviewsByMovie(req.params.movieId)
        res.json({
            success: true,
            data: reviews
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reviews'
        })
    }
}

export const getMyReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await reviewService.getReviewsByUser(req.userId!)
        res.json({
            success: true,
            data: reviews
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reviews'
        })
    }
}

export const createReview = async (req: Request, res: Response) => {
    try {
        const review = await reviewService.createReview({
            ...req.body,
            userId: req.userId!
        })
        res.status(201).json({
            success: true,
            data: review
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create review'
        })
    }
}

export const updateReview = async (req: Request, res: Response) => {
    try {
        const review = await reviewService.updateReview(
            req.params.id,
            req.userId!,
            req.body
        )
        res.json({
            success: true,
            data: review
        })
    } catch (error: any) {
        if (error.message === 'Review not found or unauthorized') {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }
        res.status(500).json({
            success: false,
            message: 'Failed to update review'
        })
    }
}

export const deleteReview = async (req: Request, res: Response) => {
    try {
        await reviewService.deleteReview(req.params.id, req.userId!)
        res.json({
            success: true,
            message: 'Review deleted successfully'
        })
    } catch (error: any) {
        if (error.message === 'Review not found or unauthorized') {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }
        res.status(500).json({
            success: false,
            message: 'Failed to delete review'
        })
    }
}