import prisma from '../../prisma/prisma.client'
import { movieCache } from './movie.cache'
export const getAllMovies = async () => {
    try {
        // Try get from cache first
        const cached = await movieCache.getAllMovies()
        if (cached) return cached

        const movies = await prisma.movie.findMany({
            include: {
                reviews: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                }
            }
        })

        // Save to cache
        await movieCache.setAllMovies(movies)
        return movies
    } catch (error) {
        console.error('Error fetching movies:', error)
        throw error
    }
}

export const getMovieById = async (id: string) => {
    try {

        const cached = await movieCache.getMovie(id)
        if (cached) return cached

        const movie = await prisma.movie.findUnique({
            where: { id },
            include: {
                reviews: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                }
            }
        })

        if (!movie) {
            throw new Error('Movie not found')
        }

        // Save to cache
        await movieCache.setMovie(id, movie)
        return movie
    } catch (error: any) {
        // Handle Prisma error code P2023 (Malformed ObjectID)
        if (error.code === 'P2023') {
            throw new Error('Invalid movie id format')
        }
        console.error('Error fetching movie:', error)
        throw error
    }
}

export const createMovie = async (data: {
    title: string
    description: string
    releaseDate: string
    genre: string
}) => {
    try {
        const existingTitle = await prisma.movie.findFirst({
            where: {
                OR: [
                    { title: data.title }

                ]
            }
        })
        if (existingTitle) {
            throw new Error('Title already exists')
        }
        const movie = await prisma.movie.create({
            data: {
                ...data,
                releaseDate: new Date(data.releaseDate),
            },
            include: {
                reviews: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                }
            }
        })
        await movieCache.setMovie(movie.id, movie)

        await movieCache.invalidateAll()
        return movie
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Create failed: ${error.message}`)
        }
        throw new Error('Create failed: Unknown error')
    }
}

export const updateMovie = async (
    id: string,
    data: {
        title?: string
        description?: string
        releaseDate?: Date
        genre?: string
    }
) => {
    try {
        const movie = await prisma.movie.update({
            where: { id },
            data,
            include: { reviews: true }
        })

        await movieCache.invalidateMovie(id)
        await movieCache.invalidateAll()
        return movie
    } catch (error: any) {
        if (error.code === 'P2023') {
            throw new Error('Invalid movie id format')
        }
        if (error.code === 'P2025') {
            throw new Error('Movie not found')
        }
        console.error('Error updating movie:', error)
        throw error
    }
}

export const deleteMovie = async (id: string) => {
    try {
        // 1. หา review ทั้งหมดของ movie นี้
        const reviews = await prisma.review.findMany({
            where: { movieId: id },
            select: { id: true }
        })

        const reviewIds = reviews.map(r => r.id)

        // 2. ลบ like ที่เกี่ยวกับ review เหล่านี้
        if (reviewIds.length > 0) {
            await prisma.like.deleteMany({
                where: { reviewId: { in: reviewIds } }
            })
            // 3. ลบ comment ที่เกี่ยวกับ review เหล่านี้
            await prisma.comment.deleteMany({
                where: { reviewId: { in: reviewIds } }
            })
        }


        // 3. ลบ review ของ movie นี้
        await prisma.review.deleteMany({ where: { movieId: id } })

        // 4. ลบ movie
        const movie = await prisma.movie.delete({
            where: { id }
        })

        await movieCache.invalidateMovie(id)
        await movieCache.invalidateAll()
        return movie
    } catch (error: any) {
        if (error.code === 'P2023') {
            throw new Error('Invalid movie id format')
        }
        if (error.code === 'P2025') {
            throw new Error('Movie not found')
        }
        console.error('Error deleting movie:', error)
        throw error
    }
}