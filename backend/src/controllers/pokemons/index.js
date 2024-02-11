"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePokemonByIdController = exports.updatePokemonByIdController = exports.addPokemonToUserController = exports.getUserPokemonsController = void 0;
const pokemon_1 = require("../../db/pokemon");
const getUserPokemonsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const userPokemons = yield (0, pokemon_1.getUserPokemons)(userId);
        res.json(userPokemons);
    }
    catch (error) {
        let errorMessage = "Failed to request";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).json({ message: errorMessage });
    }
});
exports.getUserPokemonsController = getUserPokemonsController;
const addPokemonToUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const pokemonData = req.body;
    try {
        yield (0, pokemon_1.addPokemonToUser)(userId, pokemonData);
        res.status(201).json({ message: "Pokémon adicionado com sucesso" });
    }
    catch (error) {
        let errorMessage = "Failed to request";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).json({ message: errorMessage });
    }
});
exports.addPokemonToUserController = addPokemonToUserController;
const updatePokemonByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const pokemonId = req.params.pokemonId;
    const updatedPokemonData = req.body;
    try {
        yield (0, pokemon_1.updatePokemonById)(userId, pokemonId, updatedPokemonData);
        res.json({ message: "Pokémon atualizado com sucesso", ok: true });
    }
    catch (error) {
        let errorMessage = "Failed to request";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).json({ message: errorMessage });
    }
});
exports.updatePokemonByIdController = updatePokemonByIdController;
const deletePokemonByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const pokemonId = req.params.pokemonId;
    try {
        yield (0, pokemon_1.deletePokemonById)(userId, pokemonId);
        res.json({ message: "Pokémon deletado com sucesso", ok: true });
    }
    catch (error) {
        let errorMessage = "Failed to request";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).json({ message: errorMessage });
    }
});
exports.deletePokemonByIdController = deletePokemonByIdController;
