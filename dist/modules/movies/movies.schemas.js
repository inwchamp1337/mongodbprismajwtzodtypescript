"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovieSchema = exports.createMovieSchema = void 0;
const zod_1 = require("zod");
exports.createMovieSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string().optional(),
        releaseDate: zod_1.z.string().optional(), // Will be converted to DateTime
        genre: zod_1.z.string().optional()
    })
});
exports.updateMovieSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string()
    }),
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        releaseDate: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional()
    })
});
