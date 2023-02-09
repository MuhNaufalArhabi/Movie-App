import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";

import { typeDefs, resolvers } from "../src/resolvers";

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const graphqlTestCall = async (
  query: any,
  variables?: any,
  userId?: number | string
) => {
  return graphql({ schema, source: query, variableValues: variables });
};
