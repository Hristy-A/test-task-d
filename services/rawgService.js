import { NotFound } from '@/constants';
import { FetchError } from '@/errors/FetchError';
import { toUrlString } from '@/utils/toUrlString';
import { mockRawgService } from './mockRawgService';

const GAMES_ERROR_MESSAGE = 'failed to fetch games';

const GAME_ERROR_MESSAGE = 'failed to fetch game';
const GAME_NOT_FOUND_ERROR_MESSAGE = 'game not found';

const PLATFORM_ERROR_MESSAGE = 'failed to fetch platforms';

const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY ?? '50dbf530e8394380b4b1090d182ff50d';
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.rawg.io/api';
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API;

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * @typedef Game
 * @type {object}
 * @property {number} id - game ID.
 * @property {string} name - game name.
 * @property {string} poster - game poster url.
 * @property {number} rating - game rating.
 * @property {string} released - game release data (as ISO string).
 */

/**
 * @typedef Screenshot
 * @type {object}
 * @property {number} id - screenshot ID.
 * @property {string} image - screenshot url.
 * @property {number} width - screenshot width in px.
 * @property {number} height - screenshot height in px.
 */

/**
 * @typedef GameExtended
 * @type {object}
 * @property {number} id - game ID.
 * @property {string} name - game name.
 * @property {string} description - game description.
 * @property {string} poster - game poster url.
 * @property {number} rating - game rating.
 * @property {string} released - game release data (as ISO string).
 * @property {string} website - link to game website.
 * @property {Screenshot[]} screenshots - list of game screenshots.
 */

/**
 * @typedef Platform
 * @type {object}
 * @property {number} id - platform ID.
 * @property {string} name - platform name.
 */

const originalRawgService = {
  /**
   * Fetch games with filters (search, platform), ordering (release data and rating) with optional pagination.
   * @param {object} - fetch config.
   * @returns @type {Promise<Game>}
   */
  async fetchGames({
    page = 1,
    pageSize = 30,
    search = null,
    ordering = {},
    platforms = [],
  } = {}) {
    const query = {
      key: API_KEY,
      page,
      page_size: pageSize,
    };

    if (search !== null && search !== '') {
      query.search = search;
    }

    const activePlatforms =
      platforms?.filter?.((platform) => platform.active) ?? [];

    if (activePlatforms !== null && activePlatforms.length !== 0) {
      query.platforms = activePlatforms.map((p) => p.id).join(',');
      console.log(query.platforms);
    }

    const orderingEntries = Object.values(ordering).filter((o) => o !== null);
    if (orderingEntries.length > 0) {
      query.ordering = orderingEntries.join(',');
    }

    const response = await fetch(`${API_URL}/games?${toUrlString(query)}`);

    if (response.ok) {
      const games = await response.json();

      return games.results.map(
        ({ id, name, background_image: poster, rating, released }) => ({
          id,
          name,
          poster,
          rating,
          released,
        })
      );
    }

    throw new Error(GAMES_ERROR_MESSAGE);
  },
  /**
   * Fetch one extended game info by id.
   * @param {number} id - game id.
   * @returns @type {Promise<GameExtended>}
   */
  async fetchGame(id) {
    const [gameResponse, screenshotsResponse] = await Promise.all([
      fetch(`${API_URL}/games/${id}?key=${API_KEY}`),
      fetch(`${API_URL}/games/${id}/screenshots?key=${API_KEY}`),
    ]);

    if (gameResponse.ok) {
      const [game, screenshots] = await Promise.all([
        gameResponse.json(),
        screenshotsResponse.ok
          ? screenshotsResponse.json()
          : Promise.resolve({ results: [] }),
      ]);

      return {
        id: game.id,
        name: game.name,
        description: game.description_raw,
        poster: game.background_image,
        rating: game.rating,
        released: game.released,
        website: game.website,
        screenshots: screenshots.results,
      };
    }
    if (gameResponse.status === NotFound) {
      throw new FetchError(GAME_NOT_FOUND_ERROR_MESSAGE, NotFound);
    }

    throw new Error(GAME_ERROR_MESSAGE);
  },
  /**
   * Fetch all available game platforms.
   * @returns @type {Promise<Platform[]>}
   */
  async fetchPlatforms() {
    const response = await fetch(`${API_URL}/platforms?key=${API_KEY}`);

    if (response.ok) {
      const data = await response.json();

      return data.results.map(({ id, name }) => ({
        id,
        name,
        active: false,
      }));
    }

    throw new Error(PLATFORM_ERROR_MESSAGE);
  },
};

export const rawgService =
  isDevelopment && USE_MOCK_API ? mockRawgService : originalRawgService;
