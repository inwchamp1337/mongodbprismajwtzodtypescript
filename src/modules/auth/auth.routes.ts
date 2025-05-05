import express from 'express'
import { register, login } from './auth.controller'
import { registerSchema, loginSchema } from './auth.schemas'
import { validateRequest } from '../../middleware/validateRequest'

const router = express.Router()

router.post('/register', validateRequest(registerSchema), register)
router.post('/login', validateRequest(loginSchema), login)

export default router