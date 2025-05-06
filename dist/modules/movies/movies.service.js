"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovieById = exports.getAllMovies = void 0;
const prisma_client_1 = __importDefault(require("../../prisma/prisma.client"));
const getAllMovies = async () => {
    try {
        return await prisma_client_1.default.movie.findMany({
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
        });
    }
    catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};
exports.getAllMovies = getAllMovies;
const getMovieById = async (id) => {
    try {
        const movie = await prisma_client_1.default.movie.findUnique({
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
        });
        if (!movie) {
            throw new Error('Movie not found');
        }
        return movie;
    }
    catch (error) {
        console.error('Error fetching movie:', error);
        throw error;
    }
};
exports.getMovieById = getMovieById;
const createMovie = async (data) => {
    try {
        return await prisma_client_1.default.movie.create({
            data,
            include: {
                reviews: true
            }
        });
    }
    catch (error) {
        console.error('Error creating movie:', error);
        throw error;
    }
};
exports.createMovie = createMovie;
const updateMovie = async (id, data) => {
    try {
        const movie = await prisma_client_1.default.movie.findUnique({
            where: { id }
        });
        if (!movie) {
            throw new Error('Movie not found');
        }
        return await prisma_client_1.default.movie.update({
            where: { id },
            data,
            include: {
                reviews: true
            }
        });
    }
    catch (error) {
        console.error('Error updating movie:', error);
        throw error;
    }
};
exports.updateMovie = updateMovie;
const deleteMovie = async (id) => {
    try {
        // Check if movie exists
        const movie = await prisma_client_1.default.movie.findUnique({
            where: { id }
        });
        if (!movie) {
            throw new Error('Movie not found');
        }
        // Delete related reviews first
        await prisma_client_1.default.review.deleteMany({
            where: { movieId: id }
        });
        // Then delete the movie
        return await prisma_client_1.default.movie.delete({
            where: { id }
        });
    }
    catch (error) {
        console.error('Error deleting movie:', error);
        throw error;
    }
};
exports.deleteMovie = deleteMovie;
