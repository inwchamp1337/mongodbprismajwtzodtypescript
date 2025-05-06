"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const movies_routes_1 = __importDefault(require("./modules/movies/movies.routes"));
const reviews_routes_1 = __importDefault(require("./modules/reviews/reviews.routes"));
const comment_routes_1 = __importDefault(require("./modules/comment/comment.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger/swagger.json"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Swagger documentation
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/movies', movies_routes_1.default);
app.use('/api/reviews', reviews_routes_1.default);
app.use('/api/comments', comment_routes_1.default);
// Error Handling
app.use(errorHandler_1.errorHandler);
exports.default = app;
