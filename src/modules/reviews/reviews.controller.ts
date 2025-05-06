import { Request, Response } from 'express'
import * as reviewService from './reviews.service'

export const createReview = async (req: Request, res: Response) => {
    try {
        const review = await reviewService.createReview({
            userId: req.userId!, // From auth middleware
            movieId: req.body.movieId,
            rating: req.body.rating,
            content: req.body.content
        })
        res.status(201).json({ success: true, data: review })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create review' })
    }
}

export const getMovieReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await reviewService.getReviewsByMovie(req.params.movieId)
        res.json({ success: true, data: reviews })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch reviews' })
    }
}

export const getUserReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await reviewService.getReviewsByUser(req.userId!)
        res.json({ success: true, data: reviews })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch reviews' })
    }
}

export const updateReview = async (req: Request, res: Response) => {
    try {
        const review = await reviewService.updateReview(
            req.params.id,
            req.userId!,
            {
                rating: req.body.rating,
                content: req.body.content
            }
        )
        res.json({ success: true, data: review })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update review' })
    }
}

export const deleteReview = async (req: Request, res: Response) => {
    try {
        await reviewService.deleteReview(req.params.id, req.userId!)
        res.json({ success: true, message: 'Review deleted successfully' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete review' })
    }
}