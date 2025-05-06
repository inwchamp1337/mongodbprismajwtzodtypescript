"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email format'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
        username: zod_1.z.string().min(3, 'Username must be at least 3 characters'),
        profile: zod_1.z.object({
            fullName: zod_1.z.string().min(2, 'Full name is required'),
            avatarUrl: zod_1.z.string().optional(),
            bio: zod_1.z.string().optional(),
            birthday: zod_1.z.string().transform(str => new Date(str))
        })
    })
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email format'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters')
    })
});
