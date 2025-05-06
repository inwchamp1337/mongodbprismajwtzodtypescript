"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieParamsSchema = exports.updateMovieSchema = exports.createMovieSchema = void 0;
const zod_1 = require("zod");
exports.createMovieSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Movie title is required'),
        description: zod_1.z.string().min(1, 'Description is required'),
        releaseDate: zod_1.z.string().transform(str => new Date(str)),
        genre: zod_1.z.string().min(1, 'Genre is required')
    })
});
exports.updateMovieSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'Movie ID is required'
        })
    }),
    body: zod_1.z.object({
        title: zod_1.z.string().min(1).optional(),
        description: zod_1.z.string().min(1).optional(),
        releaseDate: zod_1.z.string().transform(str => new Date(str)).optional(),
        genre: zod_1.z.string().min(1).optional()
    })
});
exports.movieParamsSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'Movie ID is required'
        })
    })
});
