export const typeDefs = `#graphql

type Actor {
    name: String!
}

input ActorInput {
    name: String!
}

type Message {
    message: String!
}

type Query {
    actors: [Actor]!
    actor(id: ID!): Actor!
}

type Mutation {
    updateActor(id: ID!, actor: ActorInput!): Message
    deleteActor(id: ID!): Message
}
`