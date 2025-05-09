import Redis from 'ioredis'
import { config } from '../config'

export class BaseCache {
    protected redis: Redis
    protected readonly keyPrefix: string
    protected readonly ttl: number = 3600 // 1 hour default

    constructor(keyPrefix: string) {
        this.redis = new Redis({
            host: config.REDIS_HOST,
            port: config.REDIS_PORT,
            password: config.REDIS_PASSWORD
        })
        this.keyPrefix = keyPrefix
    }

    protected getKey(id: string): string {
        return `${this.keyPrefix}:${id}`
    }

    protected async get<T>(key: string): Promise<T | null> {
        const data = await this.redis.get(key)
        return data ? JSON.parse(data) : null
    }

    protected async set(key: string, value: any): Promise<void> {
        await this.redis.setex(key, this.ttl, JSON.stringify(value))
    }

    protected async del(key: string): Promise<void> {
        await this.redis.del(key)
    }
}