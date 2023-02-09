import { typeDefs as movieDefs, resolvers as movieResolver } from "./movie";
import { typeDefs as authorDefs, resolvers as authorResolver } from "./author";
import { typeDefs as actorDefs, resolvers as actorResolver } from "./actor";

export const typeDefs = [movieDefs, authorDefs, actorDefs];

export const resolvers = [movieResolver, authorResolver, actorResolver];