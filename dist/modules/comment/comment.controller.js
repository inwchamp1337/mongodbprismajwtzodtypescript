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
exports.deleteComment = exports.updateComment = exports.getCommentsByReview = exports.createComment = void 0;
const commentService = __importStar(require("./comment.service"));
const createComment = async (req, res) => {
    try {
        const comment = await commentService.createComment({
            userId: req.userId, // From auth middleware
            reviewId: req.body.reviewId,
            content: req.body.content
        });
        res.status(201).json({ success: true, data: comment });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create comment' });
    }
};
exports.createComment = createComment;
const getCommentsByReview = async (req, res) => {
    try {
        const comments = await commentService.getCommentsByReview(req.params.reviewId);
        res.json({ success: true, data: comments });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch comments' });
    }
};
exports.getCommentsByReview = getCommentsByReview;
const updateComment = async (req, res) => {
    try {
        const comment = await commentService.updateComment(req.params.id, req.userId, {
            content: req.body.content
        });
        res.json({ success: true, data: comment });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update comment' });
    }
};
exports.updateComment = updateComment;
const deleteComment = async (req, res) => {
    try {
        await commentService.deleteComment(req.params.id, req.userId);
        res.json({ success: true, message: 'Comment deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete comment' });
    }
};
exports.deleteComment = deleteComment;
