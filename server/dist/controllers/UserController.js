"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const api_erros_1 = require("../helpers/api-erros");
const userRepository_1 = require("../repositories/userRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserPokemon_1 = require("../entities/UserPokemon");
const data_source_1 = require("../data-source");
const User_1 = require("../entities/User");
const userPokemon = new UserPokemon_1.UserPokemon();
class UserController {
    async create(req, res) {
        const { name, email, password } = req.body;
        const userExists = await userRepository_1.userRepository.findOneBy({ email });
        if (userExists) {
            throw new api_erros_1.BadRequestError("E-mail já existe");
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = userRepository_1.userRepository.create({
            name,
            email,
            password: hashPassword,
        });
        await userRepository_1.userRepository.save(newUser);
        const { password: _, ...user } = newUser;
        return res.status(201).json(user);
    }
    async login(req, res) {
        var _a;
        const { email, password } = req.body;
        const user = await userRepository_1.userRepository.findOneBy({ email });
        if (!user) {
            throw new api_erros_1.BadRequestError("E-mail ou senha inválidos");
        }
        const verifyPass = await bcrypt_1.default.compare(password, user.password);
        if (!verifyPass) {
            throw new api_erros_1.BadRequestError("E-mail ou senha inválidos");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : "", {
            expiresIn: "8h",
        });
        const { password: _, ...userLogin } = user;
        return res.json({
            user: userLogin,
            token: token,
        });
    }
    async capturePokemon(req, res) {
        const { userId, name, image, pokemonType, weight, height } = req.body;
        // console.log("dados recebidos", req.body);
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const userExists = await userRepository.findOneBy({ id: userId });
        if (!userExists) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        const userPokemonRepository = data_source_1.AppDataSource.getRepository(UserPokemon_1.UserPokemon);
        const newPokemon = userPokemonRepository.create({
            name,
            image,
            pokemonType,
            weight,
            height,
            captureDate: new Date(), // Data atual como data de captura
            user: userExists, // Associando o Pokémon ao usuário encontrado
        });
        await userPokemonRepository.save(newPokemon);
        console.log("Pokemon criado", newPokemon);
        // // Retornando o Pokémon capturado, excluindo informações sensíveis do usuário
        // const { user, ...pokemonWithoutUser } = newPokemon;
        // return res.status(201).json(pokemonWithoutUser);
    }
}
exports.UserController = UserController;
