"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = exports.getCommentById = exports.getCommentsByReview = exports.getAllComments = void 0;
const prisma_client_1 = __importDefault(require("../../prisma/prisma.client"));
const getAllComments = async () => {
    return prisma_client_1.default.comment.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            review: true
        }
    });
};
exports.getAllComments = getAllComments;
const getCommentsByReview = async (reviewId) => {
    return prisma_client_1.default.comment.findMany({
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
    });
};
exports.getCommentsByReview = getCommentsByReview;
const getCommentById = async (id) => {
    return prisma_client_1.default.comment.findUnique({
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
    });
};
exports.getCommentById = getCommentById;
const createComment = async (data) => {
    return prisma_client_1.default.comment.create({
        data,
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    });
};
exports.createComment = createComment;
const updateComment = async (id, userId, data) => {
    // Check if comment belongs to user
    const comment = await prisma_client_1.default.comment.findFirst({
        where: {
            id,
            userId
        }
    });
    if (!comment) {
        throw new Error('Comment not found or unauthorized');
    }
    return prisma_client_1.default.comment.update({
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
    });
};
exports.updateComment = updateComment;
const deleteComment = async (id, userId) => {
    // Check if comment belongs to user
    const comment = await prisma_client_1.default.comment.findFirst({
        where: {
            id,
            userId
        }
    });
    if (!comment) {
        throw new Error('Comment not found or unauthorized');
    }
    return prisma_client_1.default.comment.delete({
        where: { id }
    });
};
exports.deleteComment = deleteComment;
