"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const movies_service_1 = require("../../modules/movies/movies.service"); // ใช้ service แทน controller
async function seedMovies() {
    for (let i = 0; i < 5; i++) {
        await (0, movies_service_1.createMovie)({
            title: faker_1.faker.lorem.words(3),
            description: faker_1.faker.lorem.sentences(2),
            releaseDate: faker_1.faker.date.past({ years: 20 }), // ข้อมูลที่เป็น Date
            genre: faker_1.faker.helpers.arrayElement(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'])
        });
    }
    console.log('✅ Seeded 5 random movies');
}
seedMovies().catch((e) => {
    console.error(e);
    process.exit(1);
});
