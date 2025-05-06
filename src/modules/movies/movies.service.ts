import prisma from '../../prisma/prisma.client'

export const getAllMovies = async () => {
    return prisma.movie.findMany()
}

export const getMovieById = async (id: string) => {
    return prisma.movie.findUnique({
        where: { id }
    })
}

export const createMovie = async (data: {
    title: string
    description: string
    releaseDate: Date
    genre: string
}) => {
    return prisma.movie.create({
        data
    })
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
    return prisma.movie.update({
        where: { id },
        data
    })
}

export const deleteMovie = async (id: string) => {
    return prisma.movie.delete({
        where: { id }
    })
}