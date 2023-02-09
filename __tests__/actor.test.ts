import { gql } from "apollo-server";
import { server } from "../src/index";

let actorId: any;
describe("actor", () => {
  it("get all actors", async () => {
    const responseGet = await server.executeOperation({
      query: gql`
        query GetActors {
          actors {
            id
            name
          }
        }
      `,
    });
    console.log(responseGet);
    expect(responseGet.errors).toBeUndefined();
    expect(responseGet.data?.actors[0]).toHaveProperty("id");
    expect(responseGet.data?.actors[0]).toHaveProperty("name");
    actorId = responseGet.data?.actors[0].id;
  });

  it("get actor by id", async () => {
    const responseGet = await server.executeOperation({
      query: gql`
        query GetActor($id: ID!) {
          actor(id: $id) {
            id
            name
          }
        }
      `,
      variables: {
        id: actorId,
      },
    });
    expect(responseGet.errors).toBeUndefined();
    expect(responseGet.data?.actor).toHaveProperty("id");
    expect(responseGet.data?.actor).toHaveProperty("name");
  });
});
