import prisma from '../../prisma/prisma.client'

export const createMovie = async (movieData: {
    title: string
    description?: string
    releaseDate?: Date
    genre?: string
}) => {
    return prisma.movie.create({
        data: movieData
    })
}

export const getAllMovies = async () => {
    return prisma.movie.findMany()
}

export const getMovieById = async (id: string) => {
    return prisma.movie.findUnique({
        where: { id }
    })
}

export const updateMovie = async (
    id: string,
    movieData: Partial<{
        title: string
        description?: string
        releaseDate?: Date
        genre?: string
    }>
) => {
    return prisma.movie.update({
        where: { id },
        data: movieData
    })
}

export const deleteMovie = async (id: string) => {
    return prisma.movie.delete({
        where: { id }
    })
}