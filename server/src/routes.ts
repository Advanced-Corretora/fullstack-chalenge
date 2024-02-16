import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { authMiddleware } from "./middleware/authMiddleware";
import { User } from "./entities/User";

const routes = Router();

routes.post("/auth/user", new UserController().register);
routes.post("/auth/login", new UserController().login);
routes.post("/users/capture", new UserController().capturePokemon);
routes.get("/users/pokemons", new UserController().listAllPokemons);
routes.use(authMiddleware);

export default routes;
