import app from './app';
import prisma from './prisma/prisma.client';
import { config } from './config';
import redis from './redis/redis.client';
const DB_TIMEOUT = 5000; // มิลลิวินาที

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ms);

    try {
        // Prisma จะรับตัวเลือก signal สำหรับการยกเลิก
        // @ts-ignore: PrismaClientOptions ไม่ได้ประกาศ signal แต่ underlying Mongo driver รองรับ
        return await promise.then(res => {
            clearTimeout(timeout);
            return res;
        });
    } catch (err: any) {
        clearTimeout(timeout);
        if (err.name === 'AbortError') {
            throw new Error(`Operation timed out after ${ms}ms`);
        }
        throw err;
    }
}

async function startServer() {
    try {
        // เปิด connection พร้อม timeout
        await withTimeout(prisma.$connect(), DB_TIMEOUT);

        // ส่ง ping command พร้อม timeout
        // @ts-ignore
        await withTimeout(prisma.$runCommandRaw({ ping: 1 }), DB_TIMEOUT);

        console.log('✅ Database is ready');

        await redis.connect();
        await redis.ping();
        console.log('✅ Redis connected');


        app.listen(config.PORT, () => {
            console.log(`🚀 Server running on port ${config.PORT}`);
        });
    } catch (error) {
        // console.error('❌ Failed to initialize database:', error);
        console.error('❌ Failed to initialize ', error);
        process.exit(1);
    }
}

startServer();
