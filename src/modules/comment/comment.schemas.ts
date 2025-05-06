import { z } from 'zod'

export const createCommentSchema = z.object({
    body: z.object({
        reviewId: z.string({
            required_error: 'Review ID is required'
        }),
        content: z.string()
            .min(1, 'Comment content is required')
    })
})

export const updateCommentSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: 'Comment ID is required'
        })
    }),
    body: z.object({
        content: z.string()
            .min(1, 'Comment content is required')
    })
})

export const commentParamsSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: 'Comment ID is required'
        })
    })
})