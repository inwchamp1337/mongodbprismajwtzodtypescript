"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewSchema = exports.createReviewSchema = void 0;
const zod_1 = require("zod");
exports.createReviewSchema = zod_1.z.object({
    body: zod_1.z.object({
        movieId: zod_1.z.string(),
        rating: zod_1.z.number().min(1).max(5),
        content: zod_1.z.string().optional()
    })
});
exports.updateReviewSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string()
    }),
    body: zod_1.z.object({
        rating: zod_1.z.number().min(1).max(5).optional(),
        content: zod_1.z.string().optional()
    })
});
