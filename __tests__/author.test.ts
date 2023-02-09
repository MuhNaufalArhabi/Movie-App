import { gql } from "apollo-server";
import { server } from "../src/index";

describe("author", () => {
  let authorId : any
  it("add author", async () => {
    const responseAdd = await server.executeOperation({
      query: gql`
        mutation AddAuthor($author: AuthorInput!) {
          addAuthor(author: $author) {
            id
            firstName
            lastName
            email
            phoneNumber
            address
          }
        }
      `,
      variables: {
        author: {
          firstName: "John",
          lastName: "Doe",
          email: "coba@gmail.com",
          phoneNumber: "08123456789",
          address: "Jl. Coba",
        },
      },
    });
    authorId = responseAdd.data?.addAuthor.id
    expect(responseAdd.errors).toBeUndefined();
    expect(responseAdd.data?.addAuthor).toHaveProperty("id");
    expect(responseAdd.data?.addAuthor).toHaveProperty("firstName");
    expect(responseAdd.data?.addAuthor).toHaveProperty("lastName");
    expect(responseAdd.data?.addAuthor).toHaveProperty("email");
    expect(responseAdd.data?.addAuthor).toHaveProperty("phoneNumber");
    expect(responseAdd.data?.addAuthor).toHaveProperty("address");
  });

  it("get author by id", async () => {
    const responseGet = await server.executeOperation({
      query: gql`
        query GetAuthor($id: ID!) {
          author(id: $id) {
            id
            firstName
            lastName
            email
            phoneNumber
            address
          }
        }
      `,
      variables: {
        id: authorId,
      },
    });
    expect(responseGet.errors).toBeUndefined();
    expect(responseGet.data?.author).toHaveProperty("id");
    expect(responseGet.data?.author).toHaveProperty("firstName");
    expect(responseGet.data?.author).toHaveProperty("lastName");
    expect(responseGet.data?.author).toHaveProperty("email");
    expect(responseGet.data?.author).toHaveProperty("phoneNumber");
    expect(responseGet.data?.author).toHaveProperty("address");
  });

  it("get all authors", async () => {
    const responseGetAll = await server.executeOperation({
      query: gql`
        query GetAuthors {
          authors {
            id
            firstName
            lastName
            email
            phoneNumber
            address
          }
        }
      `,
    });
    expect(responseGetAll.errors).toBeUndefined();
    expect(responseGetAll.data?.authors).toBeInstanceOf(Array);
    expect(responseGetAll.data?.authors[0]).toHaveProperty("id");
    expect(responseGetAll.data?.authors[0]).toHaveProperty("firstName");
    expect(responseGetAll.data?.authors[0]).toHaveProperty("lastName");
    expect(responseGetAll.data?.authors[0]).toHaveProperty("email");
    expect(responseGetAll.data?.authors[0]).toHaveProperty("phoneNumber");
    expect(responseGetAll.data?.authors[0]).toHaveProperty("address");
  });

  it("update author", async () => {
    const responseUpdate = await server.executeOperation({
      query: gql`
        mutation UpdateAuthor($id: ID!, $author: AuthorInput!) {
          updateAuthor(id: $id, author: $author) {
            message
          }
        }
      `,
      variables: {
        id: authorId,
        author: {
          firstName: "John update",
          lastName: "Doe update",
          email: "cobaUpdate@gmail.com",
          phoneNumber: "08123456789",
          address: "Jl. CobaUpdate",
        }
      }
    });
    expect(responseUpdate.errors).toBeUndefined();
    expect(responseUpdate.data?.updateAuthor).toHaveProperty("message");
  });

  it("delete author", async () => {
    const responseDelete = await server.executeOperation({
      query: gql`
        mutation DeleteAuthor($id: ID!) {
          deleteAuthor(id: $id) {
            message
          }
        }
      `,
      variables: {
        id: authorId,
      }
    });
    expect(responseDelete.errors).toBeUndefined();
    expect(responseDelete.data?.deleteAuthor).toHaveProperty("message");
  });
})

