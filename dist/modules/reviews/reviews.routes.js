"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validateRequest_1 = require("../../middleware/validateRequest");
const reviews_schemas_1 = require("./reviews.schemas");
const reviews_controller_1 = require("./reviews.controller");
const router = express_1.default.Router();
// Protect all review routes
router.use(auth_middleware_1.authMiddleware);
// Get all reviews and create new review
router.get('/', reviews_controller_1.getAllReviews);
router.post('/', (0, validateRequest_1.validateRequest)(reviews_schemas_1.createReviewSchema), reviews_controller_1.createReview);
// Get reviews for a specific movie
router.get('/movie/:movieId', (0, validateRequest_1.validateRequest)(reviews_schemas_1.reviewParamsSchema), reviews_controller_1.getReviewsByMovie);
// Get my reviews
router.get('/me', reviews_controller_1.getMyReviews);
// Get, update and delete specific review
router.get('/:id', (0, validateRequest_1.validateRequest)(reviews_schemas_1.reviewParamsSchema), reviews_controller_1.getReviewById);
router.put('/:id', (0, validateRequest_1.validateRequest)(reviews_schemas_1.updateReviewSchema), reviews_controller_1.updateReview);
router.delete('/:id', (0, validateRequest_1.validateRequest)(reviews_schemas_1.reviewParamsSchema), reviews_controller_1.deleteReview);
exports.default = router;
