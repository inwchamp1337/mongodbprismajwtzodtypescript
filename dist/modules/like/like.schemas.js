"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeParamsSchema = exports.createLikeSchema = void 0;
const zod_1 = require("zod");
exports.createLikeSchema = zod_1.z.object({
    body: zod_1.z.object({
        reviewId: zod_1.z.string({
            required_error: 'Review ID is required'
        })
    })
});
exports.likeParamsSchema = zod_1.z.object({
    params: zod_1.z.object({
        reviewId: zod_1.z.string({
            required_error: 'Review ID is required'
        })
    })
});
