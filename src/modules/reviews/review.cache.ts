import { BaseCache } from '../../utils/base.cache'
import { Review } from '@prisma/client'

export class ReviewCache extends BaseCache {
    constructor() {
        super('reviews')
    }

    async getAllReviews() {
        return this.get<Review[]>('all')
    }

    async setAllReviews(reviews: Review[]) {
        await this.set('all', reviews)
    }

    async getReview(id: string) {
        return this.get<Review>(this.getKey(id))
    }

    async setReview(id: string, review: Review) {
        await this.set(this.getKey(id), review)
    }

    async getMovieReviews(movieId: string) {
        return this.get<Review[]>(this.getKey(`movie:${movieId}`))
    }

    async setMovieReviews(movieId: string, reviews: Review[]) {
        await this.set(this.getKey(`movie:${movieId}`), reviews)
    }

    // Clear cache methods
    async invalidateAll() {
        await this.del('all')
    }

    async invalidateReview(id: string) {
        await this.del(this.getKey(id))
    }

    async invalidateMovieReviews(movieId: string) {
        await this.del(this.getKey(`movie:${movieId}`))
    }
}

export const reviewCache = new ReviewCache()