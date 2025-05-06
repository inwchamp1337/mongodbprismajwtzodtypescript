"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validateRequest_1 = require("../../middleware/validateRequest");
const like__schemas_1 = require("./like..schemas");
const like_controller_1 = require("./like.controller");
const router = express_1.default.Router();
// Protect all comment routes
router.use(auth_middleware_1.authMiddleware);
// Get all comments
router.get('/', like_controller_1.getAllComments);
// Get comments for a specific review
router.get('/review/:reviewId', like_controller_1.getCommentsByReview);
// Get specific comment
router.get('/:id', (0, validateRequest_1.validateRequest)(like__schemas_1.commentParamsSchema), like_controller_1.getCommentById);
// Create new comment
router.post('/', (0, validateRequest_1.validateRequest)(like__schemas_1.createCommentSchema), like_controller_1.createComment);
// Update comment
router.put('/:id', (0, validateRequest_1.validateRequest)(like__schemas_1.updateCommentSchema), like_controller_1.updateComment);
// Delete comment
router.delete('/:id', (0, validateRequest_1.validateRequest)(like__schemas_1.commentParamsSchema), like_controller_1.deleteComment);
exports.default = router;
