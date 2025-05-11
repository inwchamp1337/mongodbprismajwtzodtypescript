import prisma from '../../prisma/prisma.client'
import { commentCache } from './comment.cache'

export const getAllComments = async () => {
    // Try get from cache first
    const cached = await commentCache.getAllComments()
    if (cached) return cached

    const comments = await prisma.comment.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            review: true
        }
    })

    // Save to cache
    await commentCache.setAllComments(comments)
    return comments
}

export const getCommentsByReview = async (reviewId: string) => {
    // Try get from cache first
    const cached = await commentCache.getReviewComments(reviewId)
    if (cached) return cached

    const comments = await prisma.comment.findMany({
        where: { reviewId },
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    // Save to cache
    await commentCache.setReviewComments(reviewId, comments)
    return comments
}

export const getCommentById = async (id: string) => {
    // Try get from cache first
    const cached = await commentCache.getComment(id)
    if (cached) return cached

    const comment = await prisma.comment.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            review: true
        }
    })

    if (comment) {
        await commentCache.setComment(id, comment)
    }
    return comment
}

export const createComment = async (data: {
    userId: string
    reviewId: string
    content: string
}) => {
    const comment = await prisma.comment.create({
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
    await commentCache.invalidateAll()
    await commentCache.invalidateReviewComments(data.reviewId)

    return comment
}

export const updateComment = async (
    id: string,
    userId: string,
    data: {
        content: string
    }
) => {
    try {
        const comment = await prisma.comment.findFirst({
            where: {
                id,
                userId
            }
        })

        if (!comment) {
            throw new Error('Comment not found or unauthorized')
        }

        const updatedComment = await prisma.comment.update({
            where: { id },
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
        await commentCache.invalidateComment(id)
        await commentCache.invalidateAll()
        await commentCache.invalidateReviewComments(comment.reviewId)

        return updatedComment
    } catch (error) {
        console.error('Error updating comment:', error)
        throw error
    }
}

export const deleteComment = async (id: string, userId: string) => {
    try {
        const comment = await prisma.comment.findFirst({
            where: {
                id,
                userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            }
        })

        if (!comment) {
            throw new Error('Comment not found or unauthorized')
        }

        const deletedComment = await prisma.comment.delete({
            where: { id }
        })

        // Invalidate affected caches
        await commentCache.invalidateComment(id)
        await commentCache.invalidateAll()
        await commentCache.invalidateReviewComments(comment.reviewId)

        return deletedComment
    } catch (error) {
        console.error('Error deleting comment:', error)
        throw error
    }
}