"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.getReviewsByUser = exports.getReviewsByMovie = exports.createReview = void 0;
const prisma_client_1 = __importDefault(require("../../prisma/prisma.client"));
const createReview = async (data) => {
    return prisma_client_1.default.review.create({
        data,
        include: {
            user: true,
            movie: true
        }
    });
};
exports.createReview = createReview;
const getReviewsByMovie = async (movieId) => {
    return prisma_client_1.default.review.findMany({
        where: { movieId },
        include: {
            user: true
        }
    });
};
exports.getReviewsByMovie = getReviewsByMovie;
const getReviewsByUser = async (userId) => {
    return prisma_client_1.default.review.findMany({
        where: { userId },
        include: {
            movie: true
        }
    });
};
exports.getReviewsByUser = getReviewsByUser;
const updateReview = async (id, userId, data) => {
    return prisma_client_1.default.review.update({
        where: {
            id,
            userId // Ensure user can only update their own review
        },
        data,
        include: {
            movie: true
        }
    });
};
exports.updateReview = updateReview;
const deleteReview = async (id, userId) => {
    return prisma_client_1.default.review.delete({
        where: {
            id,
            userId // Ensure user can only delete their own review
        }
    });
};
exports.deleteReview = deleteReview;
