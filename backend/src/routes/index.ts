import express from "express";

import authentication from "./auth";

const router = express.Router();

export default (): express.Router => {
  authentication(router);

  return router;
};
