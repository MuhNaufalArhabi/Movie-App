import { gql } from "apollo-server";
import { server } from "../src/index";

describe("movie", () => {
  let movieId: any;
  it("add movie", async () => {
    const responseAdd = await server.executeOperation({
      query: gql`
        mutation AddMovie($movie: MovieInput!) {
          addMovie(movie: $movie) {
            id
            title
            synopsis
            year
            rating
            AuthorId
          }
        }
      `,
      variables: {
        movie: {
          title: "test movie",
          synopsis: "this new movie",
          year: 2010,
          rating: 9.0,
          AuthorId: 1,
          Actors: [{ name: "Lorem" }, { name: "Ipsum" }],
        },
      },
    });
    movieId = responseAdd.data?.addMovie.id;
    expect(responseAdd.errors).toBeUndefined();
    expect(responseAdd.data?.addMovie).toHaveProperty("id");
    expect(responseAdd.data?.addMovie).toHaveProperty("title");
    expect(responseAdd.data?.addMovie).toHaveProperty("synopsis");
    expect(responseAdd.data?.addMovie).toHaveProperty("year");
    expect(responseAdd.data?.addMovie).toHaveProperty("rating");
    expect(responseAdd.data?.addMovie).toHaveProperty("AuthorId");
  });

  it("get movie by id", async () => {
    const responseGet = await server.executeOperation({
      query: gql`
        query GetMovie($id: ID!) {
          movie(id: $id) {
            id
            title
            synopsis
            year
            rating
            AuthorId
            Author {
              id
              firstName
              lastName
              email
              phoneNumber
              address
            }
            Actors {
              name
            }
          }
        }
      `,
      variables: {
        id: movieId,
      },
    });
    expect(responseGet.errors).toBeUndefined();
    expect(responseGet.data?.movie).toHaveProperty("id");
    expect(responseGet.data?.movie).toHaveProperty("title");
    expect(responseGet.data?.movie).toHaveProperty("synopsis");
    expect(responseGet.data?.movie).toHaveProperty("year");
    expect(responseGet.data?.movie).toHaveProperty("rating");
    expect(responseGet.data?.movie).toHaveProperty("AuthorId");
    expect(responseGet.data?.movie).toHaveProperty("Author");
    expect(responseGet.data?.movie).toHaveProperty("Actors");
  });

  it("get all movies", async () => {
    const responseGet = await server.executeOperation({
      query: gql`
        query {
          movies {
            id
            title
            synopsis
            year
            rating
            AuthorId
            Author {
              id
              firstName
              lastName
              email
              phoneNumber
              address
            }
            Actors {
              name
            }
          }
        }
      `,
    });
    expect(responseGet.errors).toBeUndefined();
    expect(responseGet.data?.movies).toBeInstanceOf(Array);
    expect(responseGet.data?.movies[0]).toHaveProperty("id");
    expect(responseGet.data?.movies[0]).toHaveProperty("title");
    expect(responseGet.data?.movies[0]).toHaveProperty("synopsis");
    expect(responseGet.data?.movies[0]).toHaveProperty("year");
    expect(responseGet.data?.movies[0]).toHaveProperty("rating");
    expect(responseGet.data?.movies[0]).toHaveProperty("AuthorId");
    expect(responseGet.data?.movies[0]).toHaveProperty("Author");
    expect(responseGet.data?.movies[0]).toHaveProperty("Actors");
  });

  it("update movie", async () => {
    const responseUpdate = await server.executeOperation({
      query: gql`
        mutation UpdateMovie($id: ID!, $movie: MovieInput!) {
          updateMovie(id: $id, movie: $movie) {
            message
          }
        }
      `,
      variables: {
        id: movieId,
        movie: {
          title: "test movie updated",
          synopsis: "this new movie updated",
          year: 2010,
          rating: 9.0,
          AuthorId: 1,
          Actors: [{ name: "Lorem" }, { name: "Ipsum" }],
        },
      },
    });
    expect(responseUpdate.data?.message).toBe(String);

  });

  it("delete movie", async () => {
    const responseDelete = await server.executeOperation({
      query: gql`
        mutation deleteMovie($id: ID!) {
          deleteMovie(id: $id)
            message
        }
      `,
      variables: {
        id: movieId,
      },
    });
    expect(responseDelete.data?.message).toBe(String);
  });
});
