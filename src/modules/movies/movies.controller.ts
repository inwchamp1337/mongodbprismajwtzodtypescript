import { Request, Response } from 'express'
import * as movieService from './movies.service'

export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const movies = await movieService.getAllMovies()
        res.status(201).json({
            success: true,
            data: movies
        })
    } catch (error: any) {
        // ปรับปรุงการจัดการ error
        if (error.message.includes('exists')) {
            return res.status(409).json({
                success: false,
                message: error.message
            })
        }
        res.status(500).json({
            success: false,
            message: 'failed'
        })
    }
}

export const getMovieById = async (req: Request, res: Response) => {
    try {
        const movie = await movieService.getMovieById(req.params.id)
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Movie not found'
            })
        }
        res.json({
            success: true,
            data: movie
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch movie'
        })
    }
}

export const createMovie = async (req: Request, res: Response) => {
    try {
        const movie = await movieService.createMovie(req.body)
        res.status(201).json({
            success: true,
            data: movie
        })
    } catch (error: any) {
        if (error.statusCode === 409) {
            return res.status(409).json({
                success: false,
                message: error.message
            })
        }
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create movie'
        })
    }
}


export const updateMovie = async (req: Request, res: Response) => {
    try {
        const movie = await movieService.updateMovie(req.params.id, req.body)
        res.json({
            success: true,
            data: movie
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update movie'
        })
    }
}

export const deleteMovie = async (req: Request, res: Response) => {
    try {
        await movieService.deleteMovie(req.params.id)
        res.json({
            success: true,
            message: 'Movie deleted successfully'
        })
    } catch (error: any) {
        res.status(error.message === 'Movie not found' ? 404 : 500).json({
            success: false,
            message: error.message || 'Failed to delete movie'
        })
    }
}