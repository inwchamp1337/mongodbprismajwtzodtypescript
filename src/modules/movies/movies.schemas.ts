import { z } from 'zod'

export const createMovieSchema = z.object({
    body: z.object({
        title: z.string(),
        description: z.string().optional(),
        releaseDate: z.string().optional(), // Will be converted to DateTime
        genre: z.string().optional()
    })
})

export const updateMovieSchema = z.object({
    params: z.object({
        id: z.string()
    }),
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        releaseDate: z.string().optional(),
        genre: z.string().optional()
    })
})