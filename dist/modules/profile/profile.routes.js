"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validateRequest_1 = require("../../middleware/validateRequest");
const profile_schemas_1 = require("./profile.schemas");
const profile_controller_1 = require("./profile.controller");
const router = express_1.default.Router();
// Protect all profile routes
router.use(auth_middleware_1.authMiddleware);
// Get all profiles
router.get('/', profile_controller_1.getAllProfiles);
// Get my profile
router.get('/me', profile_controller_1.getMyProfile);
// Get profile by ID
router.get('/:id', (0, validateRequest_1.validateRequest)(profile_schemas_1.profileParamsSchema), profile_controller_1.getProfileById);
exports.default = router;
