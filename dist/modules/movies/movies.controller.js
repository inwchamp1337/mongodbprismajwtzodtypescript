"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.getMovieById = exports.getAllMovies = exports.createMovie = void 0;
const movieService = __importStar(require("./movies.service"));
const createMovie = async (req, res) => {
    try {
        const movie = await movieService.createMovie({
            ...req.body,
            releaseDate: req.body.releaseDate ? new Date(req.body.releaseDate) : undefined
        });
        res.status(201).json({ success: true, data: movie });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create movie' });
    }
};
exports.createMovie = createMovie;
const getAllMovies = async (req, res) => {
    try {
        const movies = await movieService.getAllMovies();
        res.json({ success: true, data: movies });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch movies' });
    }
};
exports.getAllMovies = getAllMovies;
const getMovieById = async (req, res) => {
    try {
        const movie = await movieService.getMovieById(req.params.id);
        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        res.json({ success: true, data: movie });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch movie' });
    }
};
exports.getMovieById = getMovieById;
const updateMovie = async (req, res) => {
    try {
        const movie = await movieService.updateMovie(req.params.id, {
            ...req.body,
            releaseDate: req.body.releaseDate ? new Date(req.body.releaseDate) : undefined
        });
        res.json({ success: true, data: movie });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update movie' });
    }
};
exports.updateMovie = updateMovie;
const deleteMovie = async (req, res) => {
    try {
        await movieService.deleteMovie(req.params.id);
        res.json({ success: true, message: 'Movie deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete movie' });
    }
};
exports.deleteMovie = deleteMovie;
