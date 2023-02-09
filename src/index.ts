require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./resolvers";

const port = Number.parseInt(process.env.PORT) || 5000;
export const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen({ port, path: "/graphql" })
  .then((result) => {
    console.log(`🚀  Server ready at: ${result.url}`);
  })
  .catch((err) => {
    console.log(err);
  });
