import { z } from 'zod'

export const createCommentSchema = z.object({
    body: z.object({
        reviewId: z.string(),
        content: z.string().min(1, 'Content is required')
    })
})

export const updateCommentSchema = z.object({
    params: z.object({
        id: z.string()
    }),
    body: z.object({
        content: z.string().min(1, 'Content is required')
    })
})