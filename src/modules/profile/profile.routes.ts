import express from 'express'
import { authMiddleware } from '../../middleware/auth.middleware'
import { validateRequest } from '../../middleware/validateRequest'
import { profileParamsSchema } from './profile.schemas'
import {
    getAllProfiles,
    getProfileById,
    getMyProfile
} from './profile.controller'

const router = express.Router()

// Protect all profile routes
router.use(authMiddleware)

// Get all profiles
router.get('/', getAllProfiles)

// Get my profile
router.get('/me', getMyProfile)

// Get profile by ID
router.get('/:id', validateRequest(profileParamsSchema), getProfileById)

export default router