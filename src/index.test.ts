
import resolvers from './resolvers';

jest.mock('./resolvers', () => ({
    Query: {
        games: () => [
            { id: '1', title: 'Game 1' },
            { id: '2', title: 'Game 2' },
        ],
        reviews: () => [
            { id: '1', game_id: '1', author_id: '1', content: 'Review 1' },
            { id: '2', game_id: '2', author_id: '2', content: 'Review 2' },
        ],
        authors: () => [
            { id: '1', name: 'Author 1' },
            { id: '2', name: 'Author 2' },
        ],
        game: (_parent: any, args: { id: string }) => {
            return { id: args.id, title: 'Game 1' };
        },
        review: (_parent: any, args: { id: string }) => {
            return { id: args.id, game_id: '1', author_id: '1', content: 'Review 1' };
        },
        author: (_parent: any, args: { id: string }) => {
            return { id: args.id, name: 'Author 1' };
        },
    },
    Game: {
        reviews: (parent: { id: string }) => [
            { id: '1', game_id: parent.id, author_id: '1', content: 'Review 1' },
        ],
    },
    Author: {
        reviews: (parent: { id: string }) => [
            { id: '1', game_id: '1', author_id: parent.id, content: 'Review 1' },
        ],
    },
    Review: {
        author: (parent: { author_id: string }) => {
            return { id: parent.author_id, name: 'Author 1' };
        },
        game: (parent: { game_id: string }) => {
            return { id: parent.game_id, title: 'Game 1' };
        },
    },
    Mutation: {
        addGame: (_parent: any, args: { game: any }) => {
            return args.game;
        },
    }
}));
// import { typeDefs } from './schema';
// Mock the db object
const db = {
    games: [
        { id: '1', title: 'Game 1' },
        { id: '2', title: 'Game 2' },
    ],
    reviews: [
        { id: '1', game_id: '1', author_id: '1', content: 'Review 1' },
        { id: '2', game_id: '2', author_id: '2', content: 'Review 2' },
    ],
    authors: [
        { id: '1', name: 'Author 1' },
        { id: '2', name: 'Author 2' },
    ],
};

describe('Resolvers', () => {
    test('Query.games', () => {
        const result = resolvers.Query.games();
        expect(result).toEqual(db.games);
    });

    test('Query.game', () => {
        const args = { id: '1' };
        const result = resolvers.Query.game(null, args, null, null);
        expect(result).toEqual(db.games[0]);
    });

    test('Query.reviews', () => {
        const result = resolvers.Query.reviews();
        expect(result).toEqual(db.reviews);
    });

    test('Query.review', () => {
        const args = { id: '1' };
        const result = resolvers.Query.review(null, args, null, null);
        expect(result).toEqual(db.reviews[0]);
    });

    test('Query.authors', () => {
        const result = resolvers.Query.authors();
        expect(result).toEqual(db.authors);
    });

    test('Query.author', () => {
        const args = { id: '1' };
        const result = resolvers.Query.author(null, args, null, null);
        expect(result).toEqual(db.authors[0]);
    });

    test('Game.reviews', () => {
        const parent = { id: '1' };
        const result = resolvers.Game.reviews(parent);
        expect(result).toEqual([db.reviews[0]]);
    });

    test('Author.reviews', () => {
        const parent = { id: '1' };
        const result = resolvers.Author.reviews(parent);
        expect(result).toEqual([db.reviews[0]]);
    });

    test('Review.author', () => {
        const parent = { author_id: 1 };
        const result = resolvers.Review.author(parent);
        expect(result).toEqual({ id: 1, name: 'Author 1' });
    });

    test('Review.game', () => {
        const parent = { game_id: 1 };
        const result = resolvers.Review.game(parent);
        expect(result).toEqual({ id: 1, title: 'Game 1' });
    });

    test('Mutation.addGame', () => {
        const args = { game: { name: 'Game 3' } };
        const result = resolvers.Mutation.addGame(null, args, null, null);
        expect(result.name).toEqual(args.game.name);
    });

});