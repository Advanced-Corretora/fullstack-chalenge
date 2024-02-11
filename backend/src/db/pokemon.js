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
exports.deletePokemonById = exports.updatePokemonById = exports.addPokemonToUser = exports.getUserPokemons = void 0;
const users_1 = require("../models/users");
const getUserPokemons = (userId) => users_1.UserModel.findById(userId).select("user_pokemons");
exports.getUserPokemons = getUserPokemons;
const addPokemonToUser = (userId, pokemonData) => __awaiter(void 0, void 0, void 0, function* () {
    return users_1.UserModel.findByIdAndUpdate(userId, {
        $push: { user_pokemons: pokemonData },
    });
});
exports.addPokemonToUser = addPokemonToUser;
const updatePokemonById = (userId, pokemonId, updatedPokemonData) => {
    return users_1.UserModel.findOneAndUpdate({ _id: userId, "user_pokemons.id": pokemonId }, { $set: { "user_pokemons.$": updatedPokemonData } }, { new: true });
};
exports.updatePokemonById = updatePokemonById;
const deletePokemonById = (userId, pokemonId) => {
    return users_1.UserModel.findByIdAndUpdate(userId, { $pull: { user_pokemons: { id: pokemonId } } }, { new: true });
};
exports.deletePokemonById = deletePokemonById;
