// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Author extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Author.hasMany(models.Movie)
//     }
//   }
//   Author.init({
//     name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     address: DataTypes.STRING,
//     phoneNumber: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Author',
//   });
//   return Author;
// };

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
