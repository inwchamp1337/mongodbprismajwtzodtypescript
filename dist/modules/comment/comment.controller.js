"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = exports.getCommentById = exports.getCommentsByReview = exports.getAllComments = void 0;
const commentService = __importStar(require("./comment.service"));
const getAllComments = async (req, res) => {
    try {
        const comments = await commentService.getAllComments();
        res.json({
            success: true,
            data: comments
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch comments'
        });
    }
};
exports.getAllComments = getAllComments;
const getCommentsByReview = async (req, res) => {
    try {
        const comments = await commentService.getCommentsByReview(req.params.reviewId);
        res.json({
            success: true,
            data: comments
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch comments'
        });
    }
};
exports.getCommentsByReview = getCommentsByReview;
const getCommentById = async (req, res) => {
    try {
        const comment = await commentService.getCommentById(req.params.id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }
        res.json({
            success: true,
            data: comment
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch comment'
        });
    }
};
exports.getCommentById = getCommentById;
const createComment = async (req, res) => {
    try {
        const comment = await commentService.createComment({
            ...req.body,
            userId: req.userId
        });
        res.status(201).json({
            success: true,
            data: comment
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create comment'
        });
    }
};
exports.createComment = createComment;
const updateComment = async (req, res) => {
    try {
        const comment = await commentService.updateComment(req.params.id, req.userId, req.body);
        res.json({
            success: true,
            data: comment
        });
    }
    catch (error) {
        if (error.message === 'Comment not found or unauthorized') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
        res.status(500).json({
            success: false,
            message: 'Failed to update comment'
        });
    }
};
exports.updateComment = updateComment;
const deleteComment = async (req, res) => {
    try {
        await commentService.deleteComment(req.params.id, req.userId);
        res.json({
            success: true,
            message: 'Comment deleted successfully'
        });
    }
    catch (error) {
        if (error.message === 'Comment not found or unauthorized') {
            return res.status(403).json({
                success: false,
                message: 'You can only delete your own comments'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Failed to delete comment'
        });
    }
};
exports.deleteComment = deleteComment;
