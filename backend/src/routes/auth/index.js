"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../controllers/auth/index");
exports.default = (router) => {
    router.post("/auth/register", // #swagger.tags = ['Auth']
    index_1.register);
    router.post("/auth/login", // #swagger.tags = ['Auth']
    index_1.login);
};
