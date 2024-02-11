"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokemons_1 = require("../../controllers/pokemons");
exports.default = (router) => {
    router.get("/user/:userId/pokemons", // #swagger.tags = ['Pokemon']
    pokemons_1.getUserPokemonsController);
    router.post("/user/:userId/pokemons", // #swagger.tags = ['Pokemon']
    pokemons_1.addPokemonToUserController);
    router.put("/user/:userId/pokemons/:pokemonId", // #swagger.tags = ['Pokemon']
    pokemons_1.updatePokemonByIdController);
    router.delete("/user/:userId/pokemons/:pokemonId", // #swagger.tags = ['Pokemon']
    pokemons_1.deletePokemonByIdController);
};
