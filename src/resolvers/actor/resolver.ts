import { Actor } from "../../models/actor.model";
import { sequelize } from "../../models";

export const resolvers = {
    Query: {
        actors: async () => {
            try {
                const actorRepository = sequelize.getRepository(Actor)
                const actors = await actorRepository.findAll()
                return actors;
            } catch (error) {
                throw error;
            }
        },
        actor: async (_: any, args: { id: number; }) => {
            try {
                const actorRepository = sequelize.getRepository(Actor)
                const actor = await actorRepository.findByPk(args.id)
                return actor;
            } catch (error) {
                throw error;
            }
        }
    },
    Mutation: {
        updateActor: async (_: any, args: { id: number; actor: Actor; }) => {
            try {
                const actorRepository = sequelize.getRepository(Actor)
                const actor = await actorRepository.findByPk(args.id)
                if (!actor) throw new Error("Actor not found")
                await actorRepository.update(args.actor, { where: { id: args.id } })
                return { message: "Actor updated successfully" }
            } catch (error) {
                throw error;
            }
        },
        deleteActor: async (_: any, args: { id: number; }) => {
            try {
                const actorRepository = sequelize.getRepository(Actor)
                const actor = await actorRepository.findByPk(args.id)
                if (!actor) throw new Error("Actor not found")
                await actorRepository.destroy({ where: { id: args.id } })
                return { message: "Actor deleted successfully" }
            } catch (error) {
                throw error;
            }
        }
    }
}