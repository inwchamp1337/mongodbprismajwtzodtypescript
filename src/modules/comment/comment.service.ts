import prisma from '../../prisma/prisma.client'

export const createComment = async (data: {
    userId: string
    reviewId: string
    content: string
}) => {
    return prisma.comment.create({
        data,
        include: {
            user: true,
            review: true
        }
    })
}

export const getCommentsByReview = async (reviewId: string) => {
    return prisma.comment.findMany({
        where: { reviewId },
        include: {
            user: true
        }
    })
}

export const updateComment = async (
    id: string,
    userId: string,
    data: { content: string }
) => {
    return prisma.comment.update({
        where: {
            id,
            userId // Ensure user can only update their own review
        },
        data

    })
}

export const deleteComment = async (id: string, userId: string) => {
    return prisma.comment.delete({
        where: {
            id,
            userId // Ensure user can only delete their own review
        }
    })
}