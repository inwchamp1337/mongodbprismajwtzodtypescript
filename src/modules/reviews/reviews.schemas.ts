import { z } from 'zod'

export const createReviewSchema = z.object({
    body: z.object({
        movieId: z.string(),
        rating: z.number().min(1).max(5),
        content: z.string().optional()
    })
})

export const updateReviewSchema = z.object({
    params: z.object({
        id: z.string()
    }),
    body: z.object({
        rating: z.number().min(1).max(5).optional(),
        content: z.string().optional()
    })
})