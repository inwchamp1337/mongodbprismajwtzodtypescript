"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const prisma_client_1 = __importDefault(require("./prisma/prisma.client"));
const config_1 = require("./config");
const startServer = async () => {
    try {
        await prisma_client_1.default.$connect();
        console.log('Database connected');
        app_1.default.listen(config_1.config.PORT, () => {
            console.log(`Server running on port ${config_1.config.PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
