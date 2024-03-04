let games = [
    {
        id: "1",
        title: "The Legend of Zelda: Ocarina of Time",
        platform: ["Nintendo 64"],
    },
    {
        id: "2",
        title: "The Legend of Zelda: Majora's Mask",
        platform: ["Nintendo 64"],
    },
    {
        id: "3",
        title: "The Legend of Zelda: A Link to the Past",
        platform: ["Super Nintendo Entertainment System"],
    },
    {
        id: "4",
        title: "The Legend of Zelda: Link's Awakening",
        platform: ["Nintendo Switch"],
    },
    {
        id: "5",
        title: "The Legend of Zelda: Breath of the Wild",
        platform: ["Nintendo Switch"],
    },
];

let reviews = [
    {
        id: "1",
        rating: 5,
        content: "The best game ever!",
        author_id: "1",
        game_id: "1",
    },
    {
        id: "2",
        rating: 4,
        content: "A great game!",
        author_id: "2",
        game_id: "2",
    },
    {
        id: "3",
        rating: 3,
        content: "A good game.",
        author_id: "3",
        game_id: "3",
    },
    {
        id: "4",
        rating: 5,
        content: "The best game ever!",
        author_id: "4",
        game_id: "4",
    },
    {
        id: "5",
        rating: 5,
        content: "The best game ever!",
        author_id: "1",
        game_id: "5",
    },
    {
        id: "6",
        rating: 4,
        content: "A great game!",
        author_id: "2",
        game_id: "5",
    },
    {
        id: "7",
        rating: 3,
        content: "A good game.",
        author_id: "3",
        game_id: "5",
    },
    {
        id: "8",
        rating: 5,
        content: "The best game ever!",
        author_id: "4",
        game_id: "5",
    },
];

let authors = [
    {
        id: "1",
        name: "Shigeru Miyamoto",
        verified: true,
    },
    {
        id: "2",
        name: "Eiji Aonuma",
        verified: false,
    },
    {
        id: "3",
        name: "Hidemaro Fujibayashi",
        verified: true,
    },
    {
        id: "4",
        name: "Koji Kondo",
        verified: true,
    }
];

export default { games, reviews, authors };