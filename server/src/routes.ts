import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { authMiddleware } from "./middleware/authMiddleware";

const routes = Router();

routes.post("/auth/user", new UserController().create);
routes.post("/auth/login", new UserController().login);
routes.post("/users/capture", UserController.capturePokemon);
routes.use(authMiddleware);

routes.get("/profile", new UserController().getProfile);

export default routes;
