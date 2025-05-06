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
exports.deleteReview = exports.updateReview = exports.getUserReviews = exports.getMovieReviews = exports.createReview = void 0;
const reviewService = __importStar(require("./reviews.service"));
const createReview = async (req, res) => {
    try {
        const review = await reviewService.createReview({
            userId: req.userId, // From auth middleware
            movieId: req.body.movieId,
            rating: req.body.rating,
            content: req.body.content
        });
        res.status(201).json({ success: true, data: review });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create review' });
    }
};
exports.createReview = createReview;
const getMovieReviews = async (req, res) => {
    try {
        const reviews = await reviewService.getReviewsByMovie(req.params.movieId);
        res.json({ success: true, data: reviews });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
    }
};
exports.getMovieReviews = getMovieReviews;
const getUserReviews = async (req, res) => {
    try {
        const reviews = await reviewService.getReviewsByUser(req.userId);
        res.json({ success: true, data: reviews });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
    }
};
exports.getUserReviews = getUserReviews;
const updateReview = async (req, res) => {
    try {
        const review = await reviewService.updateReview(req.params.id, req.userId, {
            rating: req.body.rating,
            content: req.body.content
        });
        res.json({ success: true, data: review });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update review' });
    }
};
exports.updateReview = updateReview;
const deleteReview = async (req, res) => {
    try {
        await reviewService.deleteReview(req.params.id, req.userId);
        res.json({ success: true, message: 'Review deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete review' });
    }
};
exports.deleteReview = deleteReview;
