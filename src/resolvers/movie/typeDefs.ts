
export const typeDefs = `#graphql

type Movie {
    id: Int!
    title: String!
    synopsis: String!
    year: Int!
    rating: Float!
    AuthorId: Int!
    Author: Author
    Actors: [Actor]
}

type Message {
    message: String!
}

input MovieInput {
    title: String!
    year: Int!
    rating: Float!
    AuthorId: Int!
    synopsis: String!
    Actors: [ActorInput]
}

type Query {
    movies: [Movie]!
    movie(id: ID!): Movie!
}

type Mutation {
    addMovie(movie: MovieInput!): Movie!
    updateMovie(id: ID!, movie: MovieInput!): Message
    deleteMovie(id: ID!): Message
}`



