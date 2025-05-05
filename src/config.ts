import 'dotenv/config'

export const config = {
    JWT_SECRET: process.env.JWT_SECRET!,
    PORT: process.env.PORT || 3000,

}