import { Sequelize } from "sequelize-typescript";
import { Actor } from "./actor.model";
import { Author } from "./author.model";
import { Movie } from "./movie.model";
import { Relation } from "./relation.model";

const dialect = process.env.DB_DIALECT;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;

export const sequelize = new Sequelize({
  database: "movie_DB",
  dialect: "postgres",
  username: user,
  password: password,
  host: host,
  storage: ":memory:",
  models: [Movie, Author, Actor, Relation],
  repositoryMode: true,
});
