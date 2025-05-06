import prisma from '../../prisma/prisma.client'

export const getAllReviews = async () => {
    return prisma.review.findMany({
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
}

export const getReviewById = async (id: string) => {
    return prisma.review.findUnique({
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
}

export const getReviewsByMovie = async (movieId: string) => {
    return prisma.review.findMany({
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
}

export const getReviewsByUser = async (userId: string) => {
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
    return prisma.review.create({
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
}

export const updateReview = async (
    id: string,
    userId: string,
    data: {
        rating?: number
        content?: string
    }
) => {
    // Check if review belongs to user
    const review = await prisma.review.findFirst({
        where: {
            id,
            userId
        }
    })

    if (!review) {
        throw new Error('Review not found or unauthorized')
    }

    return prisma.review.update({
        where: { id },
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
}

export const deleteReview = async (id: string, userId: string) => {
    // Check if review belongs to user
    const review = await prisma.review.findFirst({
        where: {
            id,
            userId
        }
    })

    if (!review) {
        throw new Error('Review not found or unauthorized')
    }

    return prisma.review.delete({
        where: { id }
    })
}