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
    },
    Mutation: {
        addGame: (_parent: any, args: { game: any }, _context: any, _info: any) => {
            const newGame = {
                ...args.game,
                id: Math.floor(Math.random() * 1000).toString()
            };
            db.games.push(newGame);
            return newGame;
        },
        deleteGame: (_parent: any, args: { id: any }, _context: any, _info: any) => {
            db.games = db.games.filter((game) => game.id !== args.id);
            return db.games;
        },
        updateGame: (_parent: any, args: { id: any, game: any }, _context: any, _info: any) => {
            db.games = db.games.map((game) => {
                if (game.id === args.id) {
                    return {
                        ...game,
                        ...args.game
                    };
                }
                return game;
            })
            return db.games.find((game) => game.id === args.id);

            //  alternative way to update game
            // const game = db.games.find((game) => game.id === args.id);
            // if (!game) {
            //     throw new Error('Game not found');
            // }
            // Object.assign(game, args.game);
            // return game;
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