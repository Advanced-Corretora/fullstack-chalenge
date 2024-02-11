"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PokemonSchema = new mongoose_1.default.Schema({
    name: { type: String },
    base_experience: { type: Number },
    image: { type: String },
    weight: { type: Number },
    height: { type: Number },
    id: { type: Number },
    captured_at: { type: Date },
    stats: [
        {
            base_stat: { type: Number },
            type: { type: String },
        },
    ],
});
exports.default = PokemonSchema;
