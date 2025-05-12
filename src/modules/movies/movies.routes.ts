import express from 'express'
import { authMiddleware } from '../../middleware/auth.middleware'
import { validateRequest } from '../../middleware/validateRequest'
import {
    createMovieSchema,
    updateMovieSchema,
    movieParamsSchema
} from './movies.schemas'
import {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
} from './movies.controller'

const router = express.Router()

// Protect all movie routes
router.use(authMiddleware)

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         releaseDate:
 *           type: string
 *           format: date-time
 *           example: "2025-05-12T02:17:25.443Z"
 *         genre:
 *           type: string
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - releaseDate
 *               - genre
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My Movie"
 *               description:
 *                 type: string
 *                 example: "A great movie"
 *               releaseDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-12T02:17:25.443Z"
 *               genre:
 *                 type: string
 *                 example: "Action"
 *     responses:
 *       201:
 *         description: Movie created successfullyL
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get movie by ID
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 *       401:
 *         description: Unauthorized
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               releaseDate:
 *                 type: date-time
 *                 format: date
 *               genre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Movie not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 *       401:
 *         description: Unauthorized
 */

router.get('/', getAllMovies)
router.get('/:id', validateRequest(movieParamsSchema), getMovieById)
router.post('/', validateRequest(createMovieSchema), createMovie)
router.put('/:id', validateRequest(updateMovieSchema), updateMovie)
router.delete('/:id', validateRequest(movieParamsSchema), deleteMovie2)

export default router