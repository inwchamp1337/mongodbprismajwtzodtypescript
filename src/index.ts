import app from './app'
import prisma from './prisma/prisma.client'
import { config } from './config'

const startServer = async () => {
    try {
        await prisma.$connect()
        console.log('Database connected')

        app.listen(config.PORT, () => {
            console.log(`Server running on port ${config.PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()