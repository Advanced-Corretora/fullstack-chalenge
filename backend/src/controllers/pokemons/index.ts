import express from "express";

import {
  addPokemonToUser,
  deletePokemonById,
  getUserPokemons,
  updatePokemonById,
} from "../../db/pokemon";

export const getUserPokemonsController = async (
  req: express.Request,
  res: express.Response
) => {
  const userId = req.params.userId;
  try {
    const userPokemons = await getUserPokemons(userId);
    res.json(userPokemons);
  } catch (error) {
    let errorMessage = "Failed to request";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({ message: errorMessage });
  }
};

export const addPokemonToUserController = async (
  req: express.Request,
  res: express.Response
) => {
  const userId = req.params.userId;
  const pokemonData = req.body;
  try {
    await addPokemonToUser(userId, pokemonData);
    res.status(201).json({ message: "Pokémon adicionado com sucesso" });
  } catch (error) {
    let errorMessage = "Failed to request";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({ message: errorMessage });
  }
};

export const updatePokemonByIdController = async (
  req: express.Request,
  res: express.Response
) => {
  const userId = req.params.userId;
  const pokemonId = req.params.pokemonId;
  const updatedPokemonData = req.body;
  try {
    await updatePokemonById(userId, pokemonId, updatedPokemonData);
    res.json({ message: "Pokémon atualizado com sucesso" });
  } catch (error) {
    let errorMessage = "Failed to request";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({ message: errorMessage });
  }
};

export const deletePokemonByIdController = async (
  req: express.Request,
  res: express.Response
) => {
  const userId = req.params.userId;
  const pokemonId = req.params.pokemonId;
  try {
    await deletePokemonById(userId, pokemonId);
    res.json({ message: "Pokémon deletado com sucesso" });
  } catch (error) {
    let errorMessage = "Failed to request";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({ message: errorMessage });
  }
};
