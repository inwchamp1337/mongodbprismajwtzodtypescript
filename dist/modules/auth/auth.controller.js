"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const { user, token } = await (0, auth_service_1.registerUser)(email, password, username);
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
        if (error.message === 'EMAIL_EXISTS') {
            return res.status(409).json({ message: 'Email already exists' });
        }
        res.status(500).json({ message: 'Registration failed' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await (0, auth_service_1.loginUser)(email, password);
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
        if (error.message === 'INVALID_CREDENTIALS') {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(500).json({ message: 'Login failed' });
    }
};
exports.login = login;
