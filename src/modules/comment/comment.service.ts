import prisma from '../../prisma/prisma.client'

export const getAllComments = async () => {
    return prisma.comment.findMany({
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
}

export const getCommentsByReview = async (reviewId: string) => {
    return prisma.comment.findMany({
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
}

export const getCommentById = async (id: string) => {
    return prisma.comment.findUnique({
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
}

export const createComment = async (data: {
    userId: string
    reviewId: string
    content: string
}) => {
    return prisma.comment.create({
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

export const updateComment = async (
    id: string,
    userId: string,
    data: {
        content: string
    }
) => {
    // Check if comment belongs to user
    const comment = await prisma.comment.findFirst({
        where: {
            id,
            userId
        }
    })

    if (!comment) {
        throw new Error('Comment not found or unauthorized')
    }

    return prisma.comment.update({
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
}

export const deleteComment = async (id: string, userId: string) => {
    try {
        // Check if comment exists and belongs to the user
        const comment = await prisma.comment.findFirst({
            where: {
                id,
                userId, // This ensures only the comment owner can delete it
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

        // If comment belongs to user, delete it
        return await prisma.comment.delete({
            where: { id }
        })
    } catch (error) {
        console.error('Error deleting comment:', error)
        throw error
    }
}