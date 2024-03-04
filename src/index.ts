import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './_db.js';

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        games: () => {
            return db.games;
        },
        game: (_parent: any, args: { id: any }, _context: any, _info: any) => {
            return db.games.find((game: { id: any }) => game.id === args.id);
        },
        reviews: () => {
            return db.reviews;
        },
        review: (_parent: any, args: { id: any }, _context: any, _info: any) => {
            return db.reviews.find((review) => review.id === args.id);
        },
        authors: () => {
            return db.authors;
        },
        author: (_parent: any, args: { id: any }, _context: any, _info: any) => {
            return db.authors.find((author) => author.id === args.id);
        }
    },
    Game: {
        reviews: (parent) => {
            return db.reviews.filter((review) => review.game_id === parent.id);
        }
    },
    Author: {
        reviews: (parent) => {
            return db.reviews.filter((review) => review.author_id === parent.id);
        }
    },
    Review: {
        author: (parent: { author_id: number }) => {
            return db.authors.find((author) => Number(author.id) === Number(parent.author_id));
        },
        game: (parent: { game_id: number }) => {
            return db.games.find((game) => Number(game.id) === Number(parent.game_id));
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);