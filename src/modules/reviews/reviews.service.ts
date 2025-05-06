import prisma from '../../prisma/prisma.client'

export const createReview = async (data: {
    userId: string
    movieId: string
    rating: number
    content?: string
}) => {
    return prisma.review.create({
        data,
        include: {
            user: true,
            movie: true
        }
    })
}

export const getReviewsByMovie = async (movieId: string) => {
    return prisma.review.findMany({
        where: { movieId },
        include: {
            user: true
        }
    })
}

export const getReviewsByUser = async (userId: string) => {
    return prisma.review.findMany({
        where: { userId },
        include: {
            movie: true
        }
    })
}

export const updateReview = async (
    id: string,
    userId: string,
    data: Partial<{
        rating: number
        content?: string
    }>
) => {
    return prisma.review.update({
        where: {
            id,
            userId // Ensure user can only update their own review
        },
        data,
        include: {
            movie: true
        }
    })
}

export const deleteReview = async (id: string, userId: string) => {
    return prisma.review.delete({
        where: {
            id,
            userId // Ensure user can only delete their own review
        }
    })
}