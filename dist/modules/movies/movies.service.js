"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.getMovieById = exports.getAllMovies = exports.createMovie = void 0;
const prisma_client_1 = __importDefault(require("../../prisma/prisma.client"));
const createMovie = async (movieData) => {
    return prisma_client_1.default.movie.create({
        data: movieData
    });
};
exports.createMovie = createMovie;
const getAllMovies = async () => {
    return prisma_client_1.default.movie.findMany();
};
exports.getAllMovies = getAllMovies;
const getMovieById = async (id) => {
    return prisma_client_1.default.movie.findUnique({
        where: { id }
    });
};
exports.getMovieById = getMovieById;
const updateMovie = async (id, movieData) => {
    return prisma_client_1.default.movie.update({
        where: { id },
        data: movieData
    });
};
exports.updateMovie = updateMovie;
const deleteMovie = async (id) => {
    return prisma_client_1.default.movie.delete({
        where: { id }
    });
};
exports.deleteMovie = deleteMovie;
