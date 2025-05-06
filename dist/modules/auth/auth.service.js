"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
// src/services/auth.service.ts
const prisma_client_1 = __importDefault(require("../../prisma/prisma.client"));
const bcrypt_utils_1 = require("../../utils/bcrypt.utils");
const jwt_utils_1 = require("../../utils/jwt.utils");
const registerUser = async (email, password, username) => {
    const existingUser = await prisma_client_1.default.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('EMAIL_EXISTS');
    }
    const hashedPassword = (0, bcrypt_utils_1.hashPassword)(password);
    const user = await prisma_client_1.default.user.create({
        data: {
            email,
            password: hashedPassword,
            username
        }
    });
    const token = (0, jwt_utils_1.generateToken)(user.id);
    return { user, token };
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await prisma_client_1.default.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('INVALID_CREDENTIALS');
    }
    const isMatch = (0, bcrypt_utils_1.comparePassword)(password, user.password);
    if (!isMatch) {
        throw new Error('INVALID_CREDENTIALS');
    }
    const token = (0, jwt_utils_1.generateToken)(user.id);
    return { user, token };
};
exports.loginUser = loginUser;
