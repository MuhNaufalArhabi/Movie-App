import { Author } from "../../models/author.model";
import { sequelize } from "../../models";

export const resolvers = {
  Query: {
    authors: async () => {
      try {
        const authorRepository = sequelize.getRepository(Author);
        const authors = await authorRepository.findAll();
        return authors;
      } catch (error) {
        throw error;
      }
    },
    author: async (_: any, args: { id: number }) => {
      try {
        const authorRepository = sequelize.getRepository(Author);
        const author = await authorRepository.findByPk(args.id);
        return author;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addAuthor: async (_: any, args: { author: Author }) => {
      try {
        const authorRepository = sequelize.getRepository(Author);
        const { firstName, lastName, email, address, phoneNumber } = args.author;
        const author = await authorRepository.create({
          firstName,
          lastName,
          email,
          address,
          phoneNumber,
        });
        return author;
      } catch (error) {
        throw error;
      }
    },
    updateAuthor: async (_: any, args: { id: number; author: Author }) => {
      try {
        const authorRepository = sequelize.getRepository(Author);
        const { firstName, lastName, email, address, phoneNumber } = args.author;

        const author = await authorRepository.findByPk(args.id);
        if (!author) throw new Error("Author not found");

        await authorRepository.update(
          { firstName, lastName, email, address, phoneNumber },
          { where: { id: args.id } }
        );
        return { message: "Author updated successfully" };
      } catch (error) {
        throw error;
      }
    },
    deleteAuthor: async (_: any, args: { id: number }) => {
      try {
        const authorRepository = sequelize.getRepository(Author);
        const author = await authorRepository.findByPk(args.id);
        if (!author) throw new Error("Author not found");

        await authorRepository.destroy({ where: { id: args.id } });
        return { message: "Author deleted successfully" };
      } catch (error) {
        throw error;
      }
    },
  },
};
