import 'dotenv/config'

export const config = {
    JWT_SECRET: process.env.JWT_SECRET!,
    PORT: process.env.PORT || 3000,
    REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
    REDIS_PORT: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
}