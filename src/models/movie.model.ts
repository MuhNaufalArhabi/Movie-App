import {
  Table,
  Column,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
} from "sequelize-typescript";
import { Author } from "./author.model";
import { Actor } from "./actor.model";
import { Relation } from "./relation.model";

@Table
export class Movie extends Model {
  @Column
  title: string;

  @Column
  year: number;

  @Column
  rating: number;

  @Column
  synopsis: string;

  @ForeignKey(() => Author)
  @Column
  AuthorId: number;

  @BelongsTo(() => Author)
  Author: Author;

  @HasMany(() => Relation)
  Relations: Relation[];

  @BelongsToMany(() => Actor, () => Relation)
  Actors: Actor[];
}
