import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v1.0.0",
    title: "PokeDashboard",
    description:
      "Um lugar onde você pode gerenciar seus pokemons e capturar novos pokemons.",
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Endpoints relacionados a autenticação",
    },
    {
      name: "Pokemon",
      description: "Endpoints relacionados a pokemons",
    },
  ],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./src/routes/auth/index.ts",
  "./src/routes/pokemon/index.ts",
];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
