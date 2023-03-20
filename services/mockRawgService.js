// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

/**
 * Mock implementation of rawg service (used during development for saving available requests on original service).
 */
export const mockRawgService = {
  fetchGames() {
    return Promise.resolve(
      Array.from({ length: 30 }, () => ({
        id: faker.datatype.number({ min: 1 }),
        name: faker.lorem.words(faker.datatype.number({ min: 1, max: 8 })),
        poster: faker.image.abstract(),
        rating: faker.datatype.number({ min: 0, max: 5, precision: 0.01 }),
        released: faker.date
          .between({ min: 1947, max: 2023, mode: 'year' })
          .toISOString(),
      }))
    );
  },
  fetchGame() {
    return Promise.resolve({
      id: faker.datatype.number({ min: 1 }),
      name: faker.lorem.words(faker.datatype.number({ min: 1, max: 8 })),
      poster: faker.image.abstract(),
      rating: faker.datatype.number({ min: 0, max: 5, precision: 0.01 }),
      released: faker.date
        .between({ min: 1947, max: 2023, mode: 'year' })
        .toISOString(),
      description: faker.lorem.paragraphs(
        faker.datatype.number({ min: 2, max: 30 }),
        '\n'
      ),
      website: faker.internet.url(),
      screenshots: faker.helpers.uniqueArray(
        faker.internet.url,
        faker.datatype.number({ min: 1, max: 20 })
      ),
    });
  },
  async fetchPlatforms() {
    return Promise.resolve(
      Array.from(
        { length: faker.datatype.number({ min: 1, max: 25 }) },
        () => ({
          id: faker.datatype.number({ min: 1 }),
          name: faker.lorem.words(faker.datatype.number({ min: 1, max: 4 })),
          active: false,
        })
      )
    );
  },
};
