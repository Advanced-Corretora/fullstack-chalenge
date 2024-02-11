import express from "express";
import {
  getUserPokemonsController,
  addPokemonToUserController,
  updatePokemonByIdController,
  deletePokemonByIdController,
} from "../../controllers/pokemons";

export default (router: express.Router) => {
  router.get(
    "/user/:userId/pokemons", // #swagger.tags = ['Pokemon']
    getUserPokemonsController
  );
  router.post(
    "/user/:userId/pokemons", // #swagger.tags = ['Pokemon']
    addPokemonToUserController
  );
  router.put(
    "/user/:userId/pokemons/:pokemonId", // #swagger.tags = ['Pokemon']
    updatePokemonByIdController
  );
  router.delete(
    "/user/:userId/pokemons/:pokemonId", // #swagger.tags = ['Pokemon']
    deletePokemonByIdController
  );
};
