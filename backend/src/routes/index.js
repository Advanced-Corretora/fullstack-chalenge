"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const pokemon_1 = __importDefault(require("./pokemon"));
const router = express_1.default.Router();
exports.default = () => {
    (0, auth_1.default)(router);
    (0, pokemon_1.default)(router);
    return router;
};
