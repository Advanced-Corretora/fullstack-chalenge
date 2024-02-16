"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const api_erros_1 = require("../helpers/api-erros");
const userRepository_1 = require("../repositories/userRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = async (req, res, next) => {
    var _a;
    const { authorization } = req.headers;
    if (!authorization) {
        throw new api_erros_1.UnauthorizedError("Não autorizado");
    }
    const token = authorization.split(" ")[1];
    const { id } = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : "");
    const user = await userRepository_1.userRepository.findOneBy({ id });
    if (!user) {
        throw new api_erros_1.UnauthorizedError("Não autorizado");
    }
    const { password: _, ...loggedUser } = user;
    req.user = loggedUser;
    next();
};
exports.authMiddleware = authMiddleware;
