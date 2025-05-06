import prisma from '../../prisma/prisma.client'

export const getAllMovies = async () => {
    try {
        return await prisma.movie.findMany({
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
    } catch (error) {
        console.error('Error fetching movies:', error)
        throw error
    }
}

export const getMovieById = async (id: string) => {
    try {
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
        return await prisma.movie.create({
            data,
            include: {
                reviews: true
            }
        })
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
        const movie = await prisma.movie.findUnique({
            where: { id }
        })

        if (!movie) {
            throw new Error('Movie not found')
        }

        return await prisma.movie.update({
            where: { id },
            data,
            include: {
                reviews: true
            }
        })
    } catch (error) {
        console.error('Error updating movie:', error)
        throw error
    }
}

export const deleteMovie = async (id: string) => {
    try {
        // Check if movie exists
        const movie = await prisma.movie.findUnique({
            where: { id }
        })

        if (!movie) {
            throw new Error('Movie not found')
        }

        // Delete related reviews first
        await prisma.review.deleteMany({
            where: { movieId: id }
        })

        // Then delete the movie
        return await prisma.movie.delete({
            where: { id }
        })
    } catch (error) {
        console.error('Error deleting movie:', error)
        throw error
    }
}