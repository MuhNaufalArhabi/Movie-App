import { Table, Column, Model, HasMany } from "sequelize-typescript";
import { Movie } from "./movie.model";

@Table
export class Author extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  address: string;

  @Column
  phoneNumber: string;

  @HasMany(() => Movie)
  movies: Movie[];
}
