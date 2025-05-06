import { faker } from '@faker-js/faker';
import prisma from '../../prisma/prisma.client';
import { hashPassword } from '../../utils/bcrypt.utils';

async function main() {
    console.log("🚀 Starting data seeding...");

    // Create users with profiles
    const users = [];
    for (let i = 0; i < 5; i++) {
        console.log(`👤 Creating user ${i + 1}...`);
        const user = await prisma.user.create({
            data: {
                email: faker.internet.email(),
                password: await hashPassword('password123'),
                username: faker.internet.username(),
                profile: {
                    create: {
                        fullName: faker.person.fullName(),
                        avatarUrl: faker.image.avatar(),
                        bio: faker.lorem.paragraph(),
                        birthday: faker.date.past()
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
        const movie = await prisma.movie.create({
            data: {
                title: faker.music.songName(),
                description: faker.lorem.paragraph(),
                releaseDate: faker.date.past(),
                genre: faker.helpers.arrayElement(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'])
            }
        });
        movies.push(movie);
    }

    // Create reviews
    for (const user of users) {
        for (const movie of movies) {
            if (Math.random() > 0.5) { // 50% chance to create review
                console.log(`📝 Creating review for movie "${movie.title}" by user "${user.username}"...`);
                const review = await prisma.review.create({
                    data: {
                        userId: user.id,
                        movieId: movie.id,
                        rating: faker.number.int({ min: 1, max: 5 }),
                        content: faker.lorem.paragraph()
                    }
                });

                // Create comments
                for (let i = 0; i < faker.number.int({ min: 0, max: 3 }); i++) {
                    await prisma.comment.create({
                        data: {
                            userId: users[Math.floor(Math.random() * users.length)].id,
                            reviewId: review.id,
                            content: faker.lorem.sentence()
                        }
                    });
                }

                // Create likes
                for (let i = 0; i < faker.number.int({ min: 0, max: 5 }); i++) {
                    try {
                        await prisma.like.create({
                            data: {
                                userId: users[Math.floor(Math.random() * users.length)].id,
                                reviewId: review.id
                            }
                        });
                    } catch (error) {
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
        await prisma.$disconnect();
    });
