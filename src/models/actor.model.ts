import { Table, Column, Model, HasMany } from "sequelize-typescript";
import { Movie } from "./movie.model";
import { Relation } from "./relation.model";

@Table
export class Actor extends Model {
  @Column
  name: string;

  @HasMany(() => Relation)
  Relation: Relation[];
}
