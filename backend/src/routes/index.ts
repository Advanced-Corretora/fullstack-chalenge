import express from "express";

import authentication from "./auth";
import pokemon from "./pokemon";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  pokemon(router);

  return router;
};
