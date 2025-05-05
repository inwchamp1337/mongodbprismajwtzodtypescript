"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const prisma_client_1 = __importDefault(require("../../prisma/prisma.client"));
const bcrypt_utils_1 = require("../../utils/bcrypt.utils");
const jwt_utils_1 = require("../../utils/jwt.utils");
const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        // Check existing user
        const existingUser = await prisma_client_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        // Hash password
        const hashedPassword = (0, bcrypt_utils_1.hashPassword)(password);
        // Create user
        const user = await prisma_client_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                username
            }
        });
        // Generate JWT
        const token = (0, jwt_utils_1.generateToken)(user.id);
        res.status(201).json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
                token
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Registration failed' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await prisma_client_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Compare password
        const isMatch = (0, bcrypt_utils_1.comparePassword)(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT
        const token = (0, jwt_utils_1.generateToken)(user.id);
        res.json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
                token
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Login failed' });
    }
};
exports.login = login;
