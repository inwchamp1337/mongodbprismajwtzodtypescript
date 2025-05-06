"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validateRequest_1 = require("../../middleware/validateRequest");
const like_schemas_1 = require("./like.schemas");
const like_controller_1 = require("./like.controller");
const router = express_1.default.Router();
// Protect all like routes
router.use(auth_middleware_1.authMiddleware);
// Get likes for a review
router.get('/review/:reviewId', (0, validateRequest_1.validateRequest)(like_schemas_1.likeParamsSchema), like_controller_1.getLikesByReview);
// Get my likes
router.get('/me', like_controller_1.getMyLikes);
// Get like status for a review
router.get('/status/:reviewId', (0, validateRequest_1.validateRequest)(like_schemas_1.likeParamsSchema), like_controller_1.getLikeStatus);
// Get likes count for a review
router.get('/count/:reviewId', (0, validateRequest_1.validateRequest)(like_schemas_1.likeParamsSchema), like_controller_1.getLikesCount);
// Toggle like
router.post('/toggle', (0, validateRequest_1.validateRequest)(like_schemas_1.createLikeSchema), like_controller_1.toggleLike);
exports.default = router;
