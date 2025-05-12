import { z } from 'zod'

export const createMovieSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Movie title is required'),
        description: z.string().min(1, 'Description is required'),
        releaseDate: z.string().transform(str => new Date(str)),
        genre: z.string().min(1, 'Genre is required')
    })
})

export const updateMovieSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: 'Movie ID is required'
        })
    }),
    body: z.object({
        title: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        releaseDate: z.string().transform(str => new Date(str)).optional(),
        genre: z.string().min(1).optional()
    })
})

export const movieParamsSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: 'Movie ID is required'
        }).regex(/^[a-f\d]{24}$/i, 'Invalid movie id format')
    })
})