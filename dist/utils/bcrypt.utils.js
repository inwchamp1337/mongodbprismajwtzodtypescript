"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = require("bcryptjs");
const SALT_ROUNDS = 10;
const hashPassword = (password) => {
    return (0, bcryptjs_1.hashSync)(password, SALT_ROUNDS);
};
exports.hashPassword = hashPassword;
const comparePassword = (password, hash) => {
    return (0, bcryptjs_1.compareSync)(password, hash);
};
exports.comparePassword = comparePassword;
