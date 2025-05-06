"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileByUserId = exports.getProfileById = exports.getAllProfiles = void 0;
const prisma_client_1 = __importDefault(require("../../prisma/prisma.client"));
const getAllProfiles = async () => {
    return prisma_client_1.default.profile.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true
                }
            }
        }
    });
};
exports.getAllProfiles = getAllProfiles;
const getProfileById = async (id) => {
    return prisma_client_1.default.profile.findUnique({
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
    });
};
exports.getProfileById = getProfileById;
const getProfileByUserId = async (userId) => {
    return prisma_client_1.default.profile.findUnique({
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
    });
};
exports.getProfileByUserId = getProfileByUserId;
