import { Movie } from "../../models/movie.model";
import { Actor } from "../../models/actor.model";
import { Author } from "../../models/author.model";
import { sequelize } from "../../models";
import { Identifier } from "sequelize";
import { Relation } from "../../models/relation.model";

export const resolvers = {
  Query: {
    movies: async () => {
      try {
        const movieRepository = sequelize.getRepository(Movie);
        const authorRepository = sequelize.getRepository(Author);
        const actorRepository = sequelize.getRepository(Actor);
        const movies = await movieRepository.findAll({
          include: [authorRepository, actorRepository],
        });
        return movies;
      } catch (error) {
        throw error;
      }
    },
    movie: async (_: any, args: { id: Identifier }) => {
      try {
        const movieRepository = sequelize.getRepository(Movie);
        const authorRepository = sequelize.getRepository(Author);
        const actorRepository = sequelize.getRepository(Actor);
        const movie = await movieRepository.findByPk(args.id, {
          include: [authorRepository, actorRepository],
        });
        return movie;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addMovie: async (_: any, args: { movie: Movie }) => {
      try {
        const movieRepository = sequelize.getRepository(Movie);
        const authorRepository = sequelize.getRepository(Author);
        const actorRepository = sequelize.getRepository(Actor);
        const relationRepository = sequelize.getRepository(Relation);
        const author = await authorRepository.findByPk(args.movie.AuthorId);
        if (!author) throw new Error("Author not found");
        const { title, year, rating, synopsis, AuthorId, Actors} = args.movie;
        const movie = await movieRepository.create({
          title,
          year,
          rating,
          synopsis,
          AuthorId,
        });
        Actors.forEach(async (actor) => {
          const [actorInstance, created] = await actorRepository.findOrCreate({
            where: { name: actor.name },defaults: { name: actor.name }
          })
          console.log(actorInstance.id, created);
          await relationRepository.create({MovieId: movie.id, ActorId: actorInstance.id})
        });
        return movie;
      } catch (error) {
        throw error;
      }
    },
    updateMovie: async (_: any, args: { id: Identifier; movie: Movie }) => {
      try {
        const movieRepository = sequelize.getRepository(Movie);
        const { title, year, rating, synopsis } = args.movie;
        const movie = await movieRepository.findByPk(args.id);
        if (!movie) throw new Error("Movie not found");
        await movieRepository.update(
          { title, year, rating, synopsis },
          { where: { id: args.id } }
        );
        return { message: "Movie updated successfully" };
      } catch (error) {
        throw error;
      }
    },
    deleteMovie: async (_: any, args: { id: Identifier }) => {
      try {
        const movieRepository = sequelize.getRepository(Movie);
        const movie = await movieRepository.destroy({ where: { id: args.id } });
        if (!movie) throw new Error("Movie not found");
        return { message: "Movie deleted successfully" };
      } catch (error) {
        throw error;
      }
    },
  },
};
