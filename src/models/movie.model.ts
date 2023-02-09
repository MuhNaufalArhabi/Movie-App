// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Movie extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Movie.belongsTo(models.Author)
//       Movie.hasMany(models.Actor)
//     }
//   }
//   Movie.init({
//     title: DataTypes.STRING,
//     year: DataTypes.INTEGER,
//     rating: DataTypes.INTEGER,
//     image: DataTypes.STRING,
//     trailer: DataTypes.STRING,
//     AuthorId: DataTypes.INTEGER,
//     synopsis: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Movie',
//   });
//   return Movie;
// };

import { Table, Column, Model, HasMany, BelongsTo , ForeignKey, BelongsToMany } from "sequelize-typescript";
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


  