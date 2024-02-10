import { UserModel } from "../models/users";

export const getUserPokemons = (userId: string) =>
  UserModel.findById(userId).select("user_pokemons");

export const addPokemonToUser = async (
  userId: string,
  pokemonData: Record<string, any>
) =>
  UserModel.findByIdAndUpdate(userId, {
    $push: { user_pokemons: pokemonData },
  });
export const updatePokemonById = (
  userId: string,
  pokemonId: string,
  updatedPokemonData: Record<string, any>
) => {
  return UserModel.findOneAndUpdate(
    { _id: userId, "user_pokemons._id": pokemonId },
    { $set: { "user_pokemons.$": updatedPokemonData } },
    { new: true }
  );
};

export const deletePokemonById = (userId: string, pokemonId: string) => {
  return UserModel.findByIdAndUpdate(
    userId,
    { $pull: { user_pokemons: { _id: pokemonId } } },
    { new: true }
  );
};
