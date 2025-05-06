import { z } from 'zod'

export const createReviewSchema = z.object({
    body: z.object({
        movieId: z.string({
            required_error: 'Movie ID is required'
        }),
        rating: z.number()
            .int()
            .min(1, 'Rating must be between 1 and 5')
            .max(5, 'Rating must be between 1 and 5'),
        content: z.string()
            .min(1, 'Review content is required')
    })
})

export const updateReviewSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: 'Review ID is required'
        })
    }),
    body: z.object({
        rating: z.number()
            .int()
            .min(1, 'Rating must be between 1 and 5')
            .max(5, 'Rating must be between 1 and 5')
            .optional(),
        content: z.string()
            .min(1, 'Review content is required')
            .optional()
    })
})

export const reviewParamsSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: 'Review ID is required'
        })
    })
})