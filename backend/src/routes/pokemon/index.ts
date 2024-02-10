import express from "express";
import {
  getUserPokemonsController,
  addPokemonToUserController,
  updatePokemonByIdController,
  deletePokemonByIdController,
} from "../../controllers/pokemons";

export default (router: express.Router) => {
  router.get("/user/:userId/pokemons", getUserPokemonsController);
  router.post("/user/:userId/pokemons", addPokemonToUserController);
  router.put("/user/:userId/pokemons/:pokemonId", updatePokemonByIdController);
  router.delete(
    "/user/:userId/pokemons/:pokemonId",
    deletePokemonByIdController
  );
};
