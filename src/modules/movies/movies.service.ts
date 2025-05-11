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
        // Try get from cache first
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
    } catch (error) {
        console.error('Error fetching movie:', error)
        throw error
    }
}

export const createMovie = async (data: {
    title: string
    description: string
    releaseDate: Date
    genre: string
}) => {
    try {
        const movie = await prisma.movie.create({
            data,
            include: {
                reviews: true
            }
        })

        // Invalidate cache
        await movieCache.invalidateAll()
        return movie
    } catch (error) {
        console.error('Error creating movie:', error)
        throw error
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
            include: {
                reviews: true
            }
        })

        // Invalidate affected caches
        await movieCache.invalidateMovie(id)
        await movieCache.invalidateAll()

        return movie
    } catch (error) {
        console.error('Error updating movie:', error)
        throw error
    }
}

export const deleteMovie = async (id: string) => {
    try {
        // Delete related reviews first
        await prisma.review.deleteMany({
            where: { movieId: id }
        })

        const movie = await prisma.movie.delete({
            where: { id }
        })

        // Invalidate affected caches
        await movieCache.invalidateMovie(id)
        await movieCache.invalidateAll()

        return movie
    } catch (error) {
        console.error('Error deleting movie:', error)
        throw error
    }
}