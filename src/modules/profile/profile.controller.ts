import { Request, Response } from 'express'
import * as profileService from './profile.service'

export const getAllProfiles = async (req: Request, res: Response) => {
    try {
        const profiles = await profileService.getAllProfiles()
        res.json({
            success: true,
            data: profiles
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch profiles'
        })
    }
}

export const getProfileById = async (req: Request, res: Response) => {
    try {
        const profile = await profileService.getProfileById(req.params.id)
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            })
        }
        res.json({
            success: true,
            data: profile
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch profile'
        })
    }
}

export const getMyProfile = async (req: Request, res: Response) => {
    try {
        const profile = await profileService.getProfileByUserId(req.userId!)
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            })
        }
        res.json({
            success: true,
            data: profile
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch profile'
        })
    }
}