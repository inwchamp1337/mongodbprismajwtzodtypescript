"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.getCommentsByReview = exports.createComment = void 0;
const prisma_client_1 = __importDefault(require("../../prisma/prisma.client"));
const createComment = async (data) => {
    return prisma_client_1.default.comment.create({
        data,
        include: {
            user: true,
            review: true
        }
    });
};
exports.createComment = createComment;
const getCommentsByReview = async (reviewId) => {
    return prisma_client_1.default.comment.findMany({
        where: { reviewId },
        include: {
            user: true
        }
    });
};
exports.getCommentsByReview = getCommentsByReview;
const updateComment = async (id, userId, data) => {
    return prisma_client_1.default.comment.update({
        where: {
            id,
            userId // Ensure user can only update their own review
        },
        data
    });
};
exports.updateComment = updateComment;
const deleteComment = async (id, userId) => {
    return prisma_client_1.default.comment.delete({
        where: {
            id,
            userId // Ensure user can only delete their own review
        }
    });
};
exports.deleteComment = deleteComment;
