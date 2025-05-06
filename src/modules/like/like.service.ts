import prisma from '../../prisma/prisma.client'

export const getLikesByReview = async (reviewId: string) => {
    return prisma.like.findMany({
        where: { reviewId },
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })
}

export const getLikesByUser = async (userId: string) => {
    return prisma.like.findMany({
        where: { userId },
        include: {
            review: {
                include: {
                    movie: true
                }
            }
        }
    })
}

export const getLikeStatus = async (reviewId: string, userId: string) => {
    const like = await prisma.like.findFirst({
        where: {
            reviewId,
            userId
        }
    })
    return !!like
}

export const createLike = async (data: {
    reviewId: string
    userId: string
}) => {
    // Check if like already exists
    const existingLike = await prisma.like.findFirst({
        where: {
            reviewId: data.reviewId,
            userId: data.userId
        }
    })

    if (existingLike) {
        throw new Error('User has already liked this review')
    }

    return prisma.like.create({
        data,
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })
}

export const deleteLike = async (reviewId: string, userId: string) => {
    const like = await prisma.like.findFirst({
        where: {
            reviewId,
            userId
        }
    })

    if (!like) {
        throw new Error('Like not found')
    }

    return prisma.like.delete({
        where: {
            id: like.id
        }
    })
}

export const getLikesCount = async (reviewId: string) => {
    return prisma.like.count({
        where: { reviewId }
    })
}