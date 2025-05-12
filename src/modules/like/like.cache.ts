import { BaseCache } from '../../utils/base.cache'
import { Like } from '@prisma/client'

export class LikeCache extends BaseCache {
    constructor() {
        super('likes')
    }

    async getReviewLikes(reviewId: string) {
        return this.get<Like[]>(this.getKey(`review:${reviewId}`))
    }

    async setReviewLikes(reviewId: string, likes: Like[]) {
        await this.set(this.getKey(`review:${reviewId}`), likes)
    }

    async getUserLikes(userId: string) {
        return this.get<Like[]>(this.getKey(`user:${userId}`))
    }

    async setUserLikes(userId: string, likes: Like[]) {
        await this.set(this.getKey(`user:${userId}`), likes)
    }

    async getLikeStatus(reviewId: string, userId: string) {
        return this.get<boolean>(this.getKey(`status:${reviewId}:${userId}`))
    }

    async setLikeStatus(reviewId: string, userId: string, status: boolean) {
        await this.set(this.getKey(`status:${reviewId}:${userId}`), status)
    }

    async getLikesCount(reviewId: string) {
        return this.get<number>(this.getKey(`count:${reviewId}`))
    }

    async setLikesCount(reviewId: string, count: number) {
        await this.set(this.getKey(`count:${reviewId}`), count)
    }

    // Cache invalidation methods
    async invalidateReviewLikes(reviewId: string) {
        await this.del(this.getKey(`review:${reviewId}`))
        await this.del(this.getKey(`count:${reviewId}`))
    }

    async invalidateUserLikes(userId: string) {
        await this.del(this.getKey(`user:${userId}`))
    }

    async invalidateLikeStatus(reviewId: string, userId: string) {
        await this.del(this.getKey(`status:${reviewId}:${userId}`))
    }
}

export const likeCache = new LikeCache()