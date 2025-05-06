"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewParamsSchema = exports.updateReviewSchema = exports.createReviewSchema = void 0;
const zod_1 = require("zod");
exports.createReviewSchema = zod_1.z.object({
    body: zod_1.z.object({
        movieId: zod_1.z.string({
            required_error: 'Movie ID is required'
        }),
        rating: zod_1.z.number()
            .int()
            .min(1, 'Rating must be between 1 and 5')
            .max(5, 'Rating must be between 1 and 5'),
        content: zod_1.z.string()
            .min(1, 'Review content is required')
    })
});
exports.updateReviewSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'Review ID is required'
        })
    }),
    body: zod_1.z.object({
        rating: zod_1.z.number()
            .int()
            .min(1, 'Rating must be between 1 and 5')
            .max(5, 'Rating must be between 1 and 5')
            .optional(),
        content: zod_1.z.string()
            .min(1, 'Review content is required')
            .optional()
    })
});
exports.reviewParamsSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'Review ID is required'
        })
    })
});
