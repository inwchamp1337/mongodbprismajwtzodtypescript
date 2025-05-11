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
            comments: true,
            likes: true
        }
    })

    // Save to cache
    await reviewCache.setMovieReviews(movieId, reviews)
    return reviews
} //เดะกลับมาเขียน 

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
) => {       //กลับมาดูใหม่นะแปลกยุ 
    try {
        // Check if review belongs to user
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

    } catch (error) {
        console.error('Error updating review:', error)
        throw error
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