"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const prisma_client_1 = __importDefault(require("../../prisma/prisma.client"));
const bcrypt_utils_1 = require("../../utils/bcrypt.utils");
const jwt_utils_1 = require("../../utils/jwt.utils");
const register = async (data) => {
    try {
        // Check if email or username already exists
        const existingUser = await prisma_client_1.default.user.findFirst({
            where: {
                OR: [
                    { email: data.email },
                    { username: data.username }
                ]
            }
        });
        if (existingUser) {
            throw new Error('Email or username already exists');
        }
        const hashedPassword = await (0, bcrypt_utils_1.hashPassword)(data.password);
        const user = await prisma_client_1.default.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                username: data.username,
                profile: {
                    create: {
                        fullName: data.profile.fullName,
                        avatarUrl: data.profile.avatarUrl || '',
                        bio: data.profile.bio || '',
                        birthday: data.profile.birthday
                    }
                }
            },
            include: {
                profile: true
            }
        });
        const { password, ...userWithoutPassword } = user;
        const token = (0, jwt_utils_1.generateToken)(user.id);
        return { user: userWithoutPassword, token };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Registration failed: ${error.message}`);
        }
        throw new Error('Registration failed: Unknown error');
    }
};
exports.register = register;
const login = async (email, password) => {
    try {
        const user = await prisma_client_1.default.user.findUnique({
            where: { email },
            include: {
                profile: true
            }
        });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await (0, bcrypt_utils_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        const { password: _, ...userWithoutPassword } = user;
        const token = (0, jwt_utils_1.generateToken)(user.id);
        return { user: userWithoutPassword, token };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Login failed: ${error.message}`);
        }
        throw new Error('Login failed: Unknown error');
    }
};
exports.login = login;
