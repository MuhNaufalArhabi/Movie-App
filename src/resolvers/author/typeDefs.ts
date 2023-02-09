export const typeDefs = `#graphql

type Author {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    address: String!
}

input AuthorInput {
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    address: String!
}

type Message {
    message: String!
}

type Query {
    authors: [Author]!
    author(id: ID!): Author!
}

type Mutation {
    addAuthor(author: AuthorInput!): Author!
    updateAuthor(id: ID!, author: AuthorInput!): Message
    deleteAuthor(id: ID!): Message
}
`