"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReviewsByUser = exports.getReviewsByMovie = exports.getReviewById = exports.getAllReviews = void 0;
const prisma_client_1 = __importDefault(require("../../prisma/prisma.client"));
const getAllReviews = async () => {
    return prisma_client_1.default.review.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            movie: true
        }
    });
};
exports.getAllReviews = getAllReviews;
const getReviewById = async (id) => {
    return prisma_client_1.default.review.findUnique({
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
    });
};
exports.getReviewById = getReviewById;
const getReviewsByMovie = async (movieId) => {
    return prisma_client_1.default.review.findMany({
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
    });
};
exports.getReviewsByMovie = getReviewsByMovie;
const getReviewsByUser = async (userId) => {
    return prisma_client_1.default.review.findMany({
        where: { userId },
        include: {
            movie: true,
            comments: true,
            likes: true
        }
    });
};
exports.getReviewsByUser = getReviewsByUser;
const createReview = async (data) => {
    return prisma_client_1.default.review.create({
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
    });
};
exports.createReview = createReview;
const updateReview = async (id, userId, data) => {
    // Check if review belongs to user
    const review = await prisma_client_1.default.review.findFirst({
        where: {
            id,
            userId
        }
    });
    if (!review) {
        throw new Error('Review not found or unauthorized');
    }
    return prisma_client_1.default.review.update({
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
    });
};
exports.updateReview = updateReview;
const deleteReview = async (id, userId) => {
    // Check if review belongs to user
    const review = await prisma_client_1.default.review.findFirst({
        where: {
            id,
            userId
        }
    });
    if (!review) {
        throw new Error('Review not found or unauthorized');
    }
    return prisma_client_1.default.review.delete({
        where: { id }
    });
};
exports.deleteReview = deleteReview;
