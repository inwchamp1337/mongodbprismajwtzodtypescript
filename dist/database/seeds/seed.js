"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// seed.ts
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const SALT_ROUNDS = 10;
async function hashPassword(password) {
    return await bcrypt_1.default.hash(password, SALT_ROUNDS);
}
async function main() {
    // สร้าง 10 ผู้ใช้พร้อมโปรไฟล์
    const users = [];
    for (let i = 0; i < 10; i++) {
        const hashedPassword = await hashPassword('password123');
        const user = await prisma.user.create({
            data: {
                username: faker_1.faker.internet.userName() + i,
                email: faker_1.faker.internet.email({ firstName: `user${i}` }),
                password: hashedPassword,
                createdAt: faker_1.faker.date.past({ years: 1 }),
                profile: {
                    create: {
                        fullName: faker_1.faker.person.fullName(),
                        avatarUrl: faker_1.faker.image.avatar(),
                        bio: faker_1.faker.lorem.sentence(),
                        birthday: faker_1.faker.date.past({ years: 30 }),
                        createdAt: faker_1.faker.date.past({ years: 1 }),
                    },
                },
            },
            include: { profile: true },
        });
        users.push(user);
    }
    // สร้างภาพยนตร์ 5 เรื่อง
    const movies = [];
    const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'];
    for (let i = 0; i < 5; i++) {
        const movie = await prisma.movie.create({
            data: {
                title: faker_1.faker.lorem.words(3),
                description: faker_1.faker.lorem.paragraphs(2),
                releaseDate: faker_1.faker.date.past({ years: 10 }),
                genre: genres[i % genres.length],
            },
        });
        movies.push(movie);
    }
    // สร้างรีวิวจากผู้ใช้
    const reviews = [];
    for (const user of users) {
        const userMovies = faker_1.faker.helpers.arrayElements(movies, 2);
        for (const movie of userMovies) {
            const review = await prisma.review.create({
                data: {
                    rating: faker_1.faker.number.int({ min: 1, max: 5 }),
                    content: faker_1.faker.lorem.paragraphs(2),
                    userId: user.id,
                    movieId: movie.id,
                    createdAt: faker_1.faker.date.recent(),
                },
            });
            reviews.push(review);
        }
    }
    // สร้างความคิดเห็นและไลค์
    for (const review of reviews) {
        // สุ่มผู้ใช้ที่ไม่ใช่เจ้าของรีวิวมาแสดงความคิดเห็น
        const commenters = faker_1.faker.helpers.arrayElements(users.filter((u) => u.id !== review.userId), 2);
        for (const user of commenters) {
            await prisma.comment.create({
                data: {
                    content: faker_1.faker.lorem.sentence(),
                    userId: user.id,
                    reviewId: review.id,
                    createdAt: faker_1.faker.date.recent(),
                },
            });
        }
        // สุ่มผู้ใช้ที่ไม่ใช่เจ้าของรีวิวมาไลค์
        const likers = faker_1.faker.helpers.arrayElements(users.filter((u) => u.id !== review.userId), 3);
        for (const user of likers) {
            await prisma.like.create({
                data: {
                    userId: user.id,
                    reviewId: review.id,
                    createdAt: faker_1.faker.date.recent(),
                },
            });
        }
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
