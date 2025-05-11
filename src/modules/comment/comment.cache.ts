import { BaseCache } from '../../utils/base.cache'
import { Comment } from '@prisma/client'

export class CommentCache extends BaseCache {
    constructor() {
        super('comments')
    }

    async getAllComments() {
        return this.get<Comment[]>('all')
    }

    async setAllComments(comments: Comment[]) {
        await this.set('all', comments)
    }

    async getComment(id: string) {
        return this.get<Comment>(this.getKey(id))
    }

    async setComment(id: string, comment: Comment) {
        await this.set(this.getKey(id), comment)
    }

    async getReviewComments(reviewId: string) {
        return this.get<Comment[]>(this.getKey(`review:${reviewId}`))
    }

    async setReviewComments(reviewId: string, comments: Comment[]) {
        await this.set(this.getKey(`review:${reviewId}`), comments)
    }

    // Cache invalidation methods
    async invalidateAll() {
        await this.del('all')
    }

    async invalidateComment(id: string) {
        await this.del(this.getKey(id))
    }

    async invalidateReviewComments(reviewId: string) {
        await this.del(this.getKey(`review:${reviewId}`))
    }
}

export const commentCache = new CommentCache()