import { Table, Column, Model, BelongsTo , ForeignKey } from "sequelize-typescript";
import { Actor } from "./actor.model";
import { Movie } from "./movie.model";

@Table
export class Relation extends Model{
    @ForeignKey(() => Movie)
    @Column
    MovieId: number;
    
    @BelongsTo(() => Movie)
    Movie: Movie;
    
    @ForeignKey(() => Actor)
    @Column
    ActorId: number;
    
    @BelongsTo(() => Actor,{as : 'Actors'})
    Actor: Actor;
}