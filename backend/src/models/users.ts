import mongoose from "mongoose";
import PokemonSchema from "./pokemons";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  user_pokemons: {
    type: [PokemonSchema],
    default: [],
  },
});

export const UserModel = mongoose.model("User", UserSchema);
