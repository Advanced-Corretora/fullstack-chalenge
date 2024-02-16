import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-erros";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserPokemon } from "../entities/UserPokemon";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const userPokemon = new UserPokemon();

export class UserController {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userExists = await userRepository.findOneBy({ email });

    if (userExists) {
      throw new BadRequestError("E-mail já existe");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await userRepository.save(newUser);

    const { password: _, ...user } = newUser;

    return res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userRepository.findOneBy({ email });

    if (!user) {
      throw new BadRequestError("E-mail ou senha inválidos");
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      throw new BadRequestError("E-mail ou senha inválidos");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? "", {
      expiresIn: "8h",
    });

    const { password: _, ...userLogin } = user;

    return res.json({
      user: userLogin,
      token: token,
    });
  }

  async capturePokemon(req: Request, res: Response) {
    const { userId, name, image, pokemonType, weight, height } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const userExists = await userRepository.findOneBy({ id: userId });

    if (!userExists) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const userPokemonRepository = AppDataSource.getRepository(UserPokemon);
    const newPokemon = userPokemonRepository.create({
      name,
      image,
      pokemonType,
      weight,
      height,
      captureDate: new Date(), //
      user: userExists,
    });

    await userPokemonRepository.save(newPokemon);

    const { user, ...pokemonWithoutUser } = newPokemon;
    return res.status(201).json(pokemonWithoutUser);
  }

  async listAllPokemons(req: Request, res: Response) {
    try {
      const userPokemonRepository = AppDataSource.getRepository(UserPokemon);
      const allPokemons = await userPokemonRepository.find();
      return res.json(allPokemons);
    } catch (error) {
      console.error("Erro ao listar Pokémons:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
