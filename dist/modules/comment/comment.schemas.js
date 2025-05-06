"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommentSchema = exports.createCommentSchema = void 0;
const zod_1 = require("zod");
exports.createCommentSchema = zod_1.z.object({
    body: zod_1.z.object({
        reviewId: zod_1.z.string(),
        content: zod_1.z.string().min(1, 'Content is required')
    })
});
exports.updateCommentSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string()
    }),
    body: zod_1.z.object({
        content: zod_1.z.string().min(1, 'Content is required')
    })
});
