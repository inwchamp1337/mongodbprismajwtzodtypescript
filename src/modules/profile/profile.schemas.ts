import { z } from 'zod'

export const profileParamsSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: 'Profile ID is required'
        })
    })
})