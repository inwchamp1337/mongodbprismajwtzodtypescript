"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
exports.config = {
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT || 3000,
};
