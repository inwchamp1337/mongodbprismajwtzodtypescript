"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileParamsSchema = void 0;
const zod_1 = require("zod");
exports.profileParamsSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'Profile ID is required'
        })
    })
});
