import { BaseCache } from '../../utils/base.cache'
import { Movie } from '@prisma/client'

export class MovieCache extends BaseCache {
    constructor() {
        super('movies')
    }

    async getAllMovies() {
        return this.get<Movie[]>('all')
    }

    async setAllMovies(movies: Movie[]) {
        await this.set('all', movies)
    }

    async getMovie(id: string) {
        return this.get<Movie>(this.getKey(id))
    }

    async setMovie(id: string, movie: Movie) {
        await this.set(this.getKey(id), movie)
    }

    // Cache invalidation methods
    async invalidateAll() {
        await this.del('all')
    }

    async invalidateMovie(id: string) {
        await this.del(this.getKey(id))
    }
}

export const movieCache = new MovieCache()