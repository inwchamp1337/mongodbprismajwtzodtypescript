"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLikesCount = exports.deleteLike = exports.createLike = exports.getLikeStatus = exports.getLikesByUser = exports.getLikesByReview = void 0;
const prisma_client_1 = __importDefault(require("../../prisma/prisma.client"));
const getLikesByReview = async (reviewId) => {
    return prisma_client_1.default.like.findMany({
        where: { reviewId },
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
exports.getLikesByReview = getLikesByReview;
const getLikesByUser = async (userId) => {
    return prisma_client_1.default.like.findMany({
        where: { userId },
        include: {
            review: {
                include: {
                    movie: true
                }
            }
        }
    });
};
exports.getLikesByUser = getLikesByUser;
const getLikeStatus = async (reviewId, userId) => {
    const like = await prisma_client_1.default.like.findFirst({
        where: {
            reviewId,
            userId
        }
    });
    return !!like;
};
exports.getLikeStatus = getLikeStatus;
const createLike = async (data) => {
    // Check if like already exists
    const existingLike = await prisma_client_1.default.like.findFirst({
        where: {
            reviewId: data.reviewId,
            userId: data.userId
        }
    });
    if (existingLike) {
        throw new Error('User has already liked this review');
    }
    return prisma_client_1.default.like.create({
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
exports.createLike = createLike;
const deleteLike = async (reviewId, userId) => {
    const like = await prisma_client_1.default.like.findFirst({
        where: {
            reviewId,
            userId
        }
    });
    if (!like) {
        throw new Error('Like not found');
    }
    return prisma_client_1.default.like.delete({
        where: {
            id: like.id
        }
    });
};
exports.deleteLike = deleteLike;
const getLikesCount = async (reviewId) => {
    return prisma_client_1.default.like.count({
        where: { reviewId }
    });
};
exports.getLikesCount = getLikesCount;
