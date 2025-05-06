"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validateRequest_1 = require("../../middleware/validateRequest");
const movies_schemas_1 = require("./movies.schemas");
const movies_controller_1 = require("./movies.controller");
const router = express_1.default.Router();
// Protect all movie routes
router.use(auth_middleware_1.authMiddleware);
// Routes
router.get('/', movies_controller_1.getAllMovies);
router.get('/:id', (0, validateRequest_1.validateRequest)(movies_schemas_1.movieParamsSchema), movies_controller_1.getMovieById);
router.post('/', (0, validateRequest_1.validateRequest)(movies_schemas_1.createMovieSchema), movies_controller_1.createMovie);
router.put('/:id', (0, validateRequest_1.validateRequest)(movies_schemas_1.updateMovieSchema), movies_controller_1.updateMovie);
router.delete('/:id', (0, validateRequest_1.validateRequest)(movies_schemas_1.movieParamsSchema), movies_controller_1.deleteMovie);
exports.default = router;
