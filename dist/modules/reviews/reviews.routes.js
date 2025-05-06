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
// Protect all review routes with authentication
router.use(auth_middleware_1.authMiddleware);
router.post('/', (0, validateRequest_1.validateRequest)(reviews_schemas_1.createReviewSchema), reviews_controller_1.createReview);
router.get('/movie/:movieId', reviews_controller_1.getMovieReviews);
router.get('/user', reviews_controller_1.getUserReviews);
router.put('/:id', (0, validateRequest_1.validateRequest)(reviews_schemas_1.updateReviewSchema), reviews_controller_1.updateReview);
router.delete('/:id', reviews_controller_1.deleteReview);
exports.default = router;
