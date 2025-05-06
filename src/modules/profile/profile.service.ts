import prisma from '../../prisma/prisma.client'

export const getAllProfiles = async () => {
    return prisma.profile.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true
                }
            }
        }
    })
}

export const getProfileById = async (id: string) => {
    return prisma.profile.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true
                }
            }
        }
    })
}

export const getProfileByUserId = async (userId: string) => {
    return prisma.profile.findUnique({
        where: { userId },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true
                }
            }
        }
    })
}