import prisma from '../../prisma/prisma.client'
import { reviewCache } from './review.cache'

export const getAllReviews = async () => {
    // Try get from cache first
    const cached = await reviewCache.getAllReviews()
    if (cached) return cached

    // If not in cache, get from DB
    const reviews = await prisma.review.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            movie: true
        }
    })

    // Save to cache
    await reviewCache.setAllReviews(reviews)
    return reviews
}

export const getReviewById = async (id: string) => {

    const cached = await reviewCache.getReview(id)
    if (cached) return cached

    const review = await prisma.review.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            movie: true,
            comments: true,
            likes: true
        }
    })

    if (review) {

        await reviewCache.setReview(id, review)  //save 
    }
    return review
}

export const getReviewsByMovie = async (movieId: string) => {
    try {
        // Try get from cache first
        const cached = await reviewCache.getMovieReviews(movieId)
        if (cached) return cached

        const reviews = await prisma.review.findMany({
            where: { movieId },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                movie: true,
                comments: true,
                likes: true
            }
        })

        // Save to cache
        await reviewCache.setMovieReviews(movieId, reviews)
        return reviews

    } catch (error: any) {
        // Handle Prisma error code P2023 (Malformed ObjectID)
        if (error.code === 'P2023') {
            throw new Error('Invalid movie id format')
        }
        console.error('Error fetching reviews:', error)
        throw error
    }
}

export const getReviewsByUser = async (userId: string) => {
    // Add user reviews cache later if needed
    return prisma.review.findMany({
        where: { userId },
        include: {
            movie: true,
            comments: true,
            likes: true
        }
    })
}
export const createReview = async (data: {
    userId: string
    movieId: string
    rating: number
    content: string
}) => {
    const review = await prisma.review.create({
        data,
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            movie: true
        }
    })

    // Invalidate affected caches
    await reviewCache.invalidateAll()
    await reviewCache.invalidateMovieReviews(data.movieId)

    return review
}

export const updateReview = async (
    id: string,
    userId: string,
    data: {
        rating?: number
        content?: string
    }
) => {
    try {
        // First check if review exists and belongs to user
        const existingReview = await prisma.review.findFirst({
            where: {
                id: id,
                userId: userId
            }
        })

        if (!existingReview) {
            throw new Error('Review not found or unauthorized')
        }

        // Then perform update
        const updatedReview = await prisma.review.update({
            where: { id: id },
            data,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                movie: true
            }
        })

        // Invalidate affected caches
        await reviewCache.invalidateReview(id)
        await reviewCache.invalidateAll()
        await reviewCache.invalidateMovieReviews(updatedReview.movieId)

        return updatedReview

    } catch (error: any) {
        // Add specific error handling
        if (error.code === 'P2023') {
            throw new Error('Invalid review id format')
        }
        if (error.message === 'Review not found or unauthorized') {
            throw error
        }
        console.error('Error updating review:', error)
        throw new Error('Failed to update review')
    }
}

export const deleteReview = async (id: string, userId: string) => {
    try {
        // Check if review belongs to user
        const review = await prisma.review.findFirst({
            where: {
                // Add type conversion for MongoDB ObjectId
                id: id,
                userId: userId
            }
        })

        if (!review) {
            throw new Error('Review not found or unauthorized')
        }
        // Store movieId before deletion for cache invalidation
        const movieId = review.movieId


        // Delete related records first
        await prisma.comment.deleteMany({
            where: { reviewId: id }
        })

        await prisma.like.deleteMany({
            where: { reviewId: id }
        })

        // Then delete the review
        return await prisma.review.delete({
            where: { id: id }
        })

        // Invalidate affected caches
        await reviewCache.invalidateReview(id)
        await reviewCache.invalidateAll()
        await reviewCache.invalidateMovieReviews(movieId)

        return review
    } catch (error) {
        console.error('Error deleting review:', error)
        throw error
    }
}