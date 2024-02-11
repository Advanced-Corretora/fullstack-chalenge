"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const pokemons_1 = __importDefault(require("./pokemons"));
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
    user_pokemons: {
        type: [pokemons_1.default],
        default: [],
    },
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
