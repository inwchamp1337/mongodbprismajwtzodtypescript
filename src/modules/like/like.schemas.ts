import { z } from 'zod'

export const createLikeSchema = z.object({
    body: z.object({
        reviewId: z.string({
            required_error: 'Review ID is required'
        })
    })
})

export const likeParamsSchema = z.object({
    params: z.object({
        reviewId: z.string({
            required_error: 'Review ID is required'
        })
    })
})