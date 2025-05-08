import { z } from 'zod'

export const registerSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email format'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        username: z.string().min(3, 'Username must be at least 3 characters'),
        profile: z.object({
            fullName: z.string().min(2, 'Full name is required'),
            avatarUrl: z.string().optional(),
            bio: z.string().optional(),
            birthday: z.string().transform(str => new Date(str))
        })
    })
})
export type RegisterInput = z.infer<typeof registerSchema>['body']
export const loginSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email format'),
        password: z.string().min(6, 'Password must be at least 6 characters')
    })
})