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
};
exports.register = register;
const login = async (email, password) => {
    const user = await prisma_client_1.default.user.findUnique({
        where: { email },
        include: {
            profile: true
        }
    });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isPasswordValid = await (0, bcrypt_utils_1.comparePassword)(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
    const { password: _, ...userWithoutPassword } = user;
    const token = (0, jwt_utils_1.generateToken)(user.id);
    return { user: userWithoutPassword, token };
};
exports.login = login;
