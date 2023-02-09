// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Actor extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Actor.belongsTo(models.Movie)
//     }
//   }
//   Actor.init({
//     name: DataTypes.STRING,
//     image: DataTypes.STRING,
//     MovieId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Actor',
//   });
//   return Actor;
// };

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

