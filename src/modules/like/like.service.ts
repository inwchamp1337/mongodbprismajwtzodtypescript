import prisma from '../../prisma/prisma.client'
import { likeCache } from './like.cache'

export const getLikesByReview = async (reviewId: string) => {
    // Try get from cache first
    const cached = await likeCache.getReviewLikes(reviewId)
    if (cached) return cached

    const likes = await prisma.like.findMany({
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

    // Save to cache
    await likeCache.setReviewLikes(reviewId, likes)
    return likes
}

export const getLikesByUser = async (userId: string) => {
    // Try get from cache first
    const cached = await likeCache.getUserLikes(userId)
    if (cached) return cached

    const likes = await prisma.like.findMany({
        where: { userId },
        include: {
            review: {
                include: {
                    movie: true
                }
            }
        }
    })

    // Save to cache
    await likeCache.setUserLikes(userId, likes)
    return likes
}

export const getLikeStatus = async (reviewId: string, userId: string) => {
    // Try get from cache first
    const cached = await likeCache.getLikeStatus(reviewId, userId)
    if (cached !== null) return cached

    const like = await prisma.like.findFirst({
        where: {
            reviewId,
            userId
        }
    })
    const status = !!like

    // Save to cache
    await likeCache.setLikeStatus(reviewId, userId, status)
    return status
}

export const createLike = async (data: {
    reviewId: string
    userId: string
}) => {
    const existingLike = await prisma.like.findFirst({
        where: {
            reviewId: data.reviewId,
            userId: data.userId
        }
    })

    if (existingLike) {
        throw new Error('User has already liked this review')
    }

    const like = await prisma.like.create({
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

    // Invalidate affected caches
    await likeCache.invalidateReviewLikes(data.reviewId)
    await likeCache.invalidateUserLikes(data.userId)
    await likeCache.invalidateLikeStatus(data.reviewId, data.userId)

    return like
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

    const result = await prisma.like.delete({
        where: {
            id: like.id
        }
    })

    // Invalidate affected caches
    await likeCache.invalidateReviewLikes(reviewId)
    await likeCache.invalidateUserLikes(userId)
    await likeCache.invalidateLikeStatus(reviewId, userId)

    return result
}

export const getLikesCount = async (reviewId: string) => {
    // Try get from cache first
    const cached = await likeCache.getLikesCount(reviewId)
    if (cached !== null) return cached

    const count = await prisma.like.count({
        where: { reviewId }
    })

    // Save to cache
    await likeCache.setLikesCount(reviewId, count)
    return count
}