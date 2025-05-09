import Redis from 'ioredis';
import { config } from '../config';

const redis = new Redis({
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    password: config.REDIS_PASSWORD,
    lazyConnect: true,
    connectTimeout: 5000,   // 5 วินาที
});

export default redis;
