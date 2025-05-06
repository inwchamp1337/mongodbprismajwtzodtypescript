"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovieById = exports.getAllMovies = void 0;
const prisma_client_1 = __importDefault(require("../../prisma/prisma.client"));
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
const createMovie = async (data) => {
    return prisma_client_1.default.movie.create({
        data
    });
};
exports.createMovie = createMovie;
const updateMovie = async (id, data) => {
    return prisma_client_1.default.movie.update({
        where: { id },
        data
    });
};
exports.updateMovie = updateMovie;
const deleteMovie = async (id) => {
    return prisma_client_1.default.movie.delete({
        where: { id }
    });
};
exports.deleteMovie = deleteMovie;
