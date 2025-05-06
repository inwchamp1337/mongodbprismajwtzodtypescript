import { faker } from '@faker-js/faker'
import { createMovie } from '../../modules/movies/movies.service'  // ใช้ service แทน controller

async function seedMovies() {
    for (let i = 0; i < 5; i++) {
        await createMovie({
            title: faker.lorem.words(3),
            description: faker.lorem.sentences(2),
            releaseDate: faker.date.past({ years: 20 }),  // ข้อมูลที่เป็น Date
            genre: faker.helpers.arrayElement(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'])
        })
    }

    console.log('✅ Seeded 5 random movies')
}

seedMovies().catch((e) => {
    console.error(e)
    process.exit(1)
})
