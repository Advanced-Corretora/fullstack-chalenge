import express from "express";

import { login, register } from "../../controllers/auth/index";

export default (router: express.Router) => {
  router.post(
    "/auth/register", // #swagger.tags = ['Auth']
    register
  );
  router.post(
    "/auth/login", // #swagger.tags = ['Auth']
    login
  );
};
