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
exports.deleteReview = exports.updateReview = exports.createReview = exports.getMyReviews = exports.getReviewsByMovie = exports.getReviewById = exports.getAllReviews = void 0;
const reviewService = __importStar(require("./reviews.service"));
const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewService.getAllReviews();
        res.json({
            success: true,
            data: reviews
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reviews'
        });
    }
};
exports.getAllReviews = getAllReviews;
const getReviewById = async (req, res) => {
    try {
        const review = await reviewService.getReviewById(req.params.id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }
        res.json({
            success: true,
            data: review
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch review'
        });
    }
};
exports.getReviewById = getReviewById;
const getReviewsByMovie = async (req, res) => {
    try {
        const reviews = await reviewService.getReviewsByMovie(req.params.movieId);
        res.json({
            success: true,
            data: reviews
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reviews'
        });
    }
};
exports.getReviewsByMovie = getReviewsByMovie;
const getMyReviews = async (req, res) => {
    try {
        const reviews = await reviewService.getReviewsByUser(req.userId);
        res.json({
            success: true,
            data: reviews
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reviews'
        });
    }
};
exports.getMyReviews = getMyReviews;
const createReview = async (req, res) => {
    try {
        const review = await reviewService.createReview({
            ...req.body,
            userId: req.userId
        });
        res.status(201).json({
            success: true,
            data: review
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create review'
        });
    }
};
exports.createReview = createReview;
const updateReview = async (req, res) => {
    try {
        const review = await reviewService.updateReview(req.params.id, req.userId, req.body);
        res.json({
            success: true,
            data: review
        });
    }
    catch (error) {
        if (error.message === 'Review not found or unauthorized') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
        res.status(500).json({
            success: false,
            message: 'Failed to update review'
        });
    }
};
exports.updateReview = updateReview;
const deleteReview = async (req, res) => {
    try {
        await reviewService.deleteReview(req.params.id, req.userId);
        res.json({
            success: true,
            message: 'Review deleted successfully'
        });
    }
    catch (error) {
        if (error.message === 'Review not found or unauthorized') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
        res.status(500).json({
            success: false,
            message: 'Failed to delete review'
        });
    }
};
exports.deleteReview = deleteReview;
