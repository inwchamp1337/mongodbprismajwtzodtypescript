"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const prisma_client_1 = __importDefault(require("../../prisma/prisma.client"));
const bcrypt_utils_1 = require("../../utils/bcrypt.utils");
async function main() {
    console.log("🚀 Starting data seeding...");
    // Create users with profiles
    const users = [];
    for (let i = 0; i < 5; i++) {
        console.log(`👤 Creating user ${i + 1}...`);
        const user = await prisma_client_1.default.user.create({
            data: {
                email: faker_1.faker.internet.email(),
                password: await (0, bcrypt_utils_1.hashPassword)('password123'),
                username: faker_1.faker.internet.username(),
                profile: {
                    create: {
                        fullName: faker_1.faker.person.fullName(),
                        avatarUrl: faker_1.faker.image.avatar(),
                        bio: faker_1.faker.lorem.paragraph(),
                        birthday: faker_1.faker.date.past()
                    }
                }
            }
        });
        users.push(user);
    }
    // Create movies
    const movies = [];
    for (let i = 0; i < 10; i++) {
        console.log(`🎬 Creating movie ${i + 1}...`);
        const movie = await prisma_client_1.default.movie.create({
            data: {
                title: faker_1.faker.music.songName(),
                description: faker_1.faker.lorem.paragraph(),
                releaseDate: faker_1.faker.date.past(),
                genre: faker_1.faker.helpers.arrayElement(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'])
            }
        });
        movies.push(movie);
    }
    // Create reviews
    for (const user of users) {
        for (const movie of movies) {
            if (Math.random() > 0.5) { // 50% chance to create review
                console.log(`📝 Creating review for movie "${movie.title}" by user "${user.username}"...`);
                const review = await prisma_client_1.default.review.create({
                    data: {
                        userId: user.id,
                        movieId: movie.id,
                        rating: faker_1.faker.number.int({ min: 1, max: 5 }),
                        content: faker_1.faker.lorem.paragraph()
                    }
                });
                // Create comments
                for (let i = 0; i < faker_1.faker.number.int({ min: 0, max: 3 }); i++) {
                    await prisma_client_1.default.comment.create({
                        data: {
                            userId: users[Math.floor(Math.random() * users.length)].id,
                            reviewId: review.id,
                            content: faker_1.faker.lorem.sentence()
                        }
                    });
                }
                // Create likes
                for (let i = 0; i < faker_1.faker.number.int({ min: 0, max: 5 }); i++) {
                    try {
                        await prisma_client_1.default.like.create({
                            data: {
                                userId: users[Math.floor(Math.random() * users.length)].id,
                                reviewId: review.id
                            }
                        });
                    }
                    catch (error) {
                        // Ignore duplicate likes
                        continue;
                    }
                }
            }
        }
    }
    console.log("🎉 Data skibidi completed successfully! 🌟");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma_client_1.default.$disconnect();
});
