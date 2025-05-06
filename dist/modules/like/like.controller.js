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
exports.getLikesCount = exports.toggleLike = exports.getLikeStatus = exports.getMyLikes = exports.getLikesByReview = void 0;
const likeService = __importStar(require("./like.service"));
const getLikesByReview = async (req, res) => {
    try {
        const likes = await likeService.getLikesByReview(req.params.reviewId);
        res.json({
            success: true,
            data: likes
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch likes'
        });
    }
};
exports.getLikesByReview = getLikesByReview;
const getMyLikes = async (req, res) => {
    try {
        const likes = await likeService.getLikesByUser(req.userId);
        res.json({
            success: true,
            data: likes
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch likes'
        });
    }
};
exports.getMyLikes = getMyLikes;
const getLikeStatus = async (req, res) => {
    try {
        const isLiked = await likeService.getLikeStatus(req.params.reviewId, req.userId);
        res.json({
            success: true,
            data: { isLiked }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to check like status'
        });
    }
};
exports.getLikeStatus = getLikeStatus;
const toggleLike = async (req, res) => {
    try {
        const { reviewId } = req.body;
        const isLiked = await likeService.getLikeStatus(reviewId, req.userId);
        if (isLiked) {
            await likeService.deleteLike(reviewId, req.userId);
            res.json({
                success: true,
                message: 'Like removed successfully',
                data: { isLiked: false }
            });
        }
        else {
            const like = await likeService.createLike({
                reviewId,
                userId: req.userId
            });
            res.json({
                success: true,
                message: 'Review liked successfully',
                data: { isLiked: true, like }
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to toggle like'
        });
    }
};
exports.toggleLike = toggleLike;
const getLikesCount = async (req, res) => {
    try {
        const count = await likeService.getLikesCount(req.params.reviewId);
        res.json({
            success: true,
            data: { count }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get likes count'
        });
    }
};
exports.getLikesCount = getLikesCount;
