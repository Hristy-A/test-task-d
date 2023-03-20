import { createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LoadingStatus } from '@/constants';
import { rawgService } from '@/services/rawgService';

export const initialState = {
  games: [],
  status: LoadingStatus.idle,
  error: null,
  platformsError: null,

  page: -1,
  pageSize: 30,
  search: null,
  ordering: {},
  platforms: [],
  throttled: false,
};

const THROTTLE_DELAY = 1000;

export const createGamesStore = (initProps) => {
  const DEFAULT_PROPS = initialState;

  return createStore(
    immer((set, get) => ({
      ...DEFAULT_PROPS,
      ...initProps,

      fetchGames: async () => {
        if (get().status === LoadingStatus.loading || get().throttled) {
          return;
        }

        set((state) => {
          state.status = LoadingStatus.loading;
          state.error = null;
        });

        try {
          const currentState = get();

          const data = await rawgService.fetchGames({
            page: currentState.page < 0 ? 1 : currentState.page + 1,
            pageSize: currentState.pageSize,
            search: currentState.search,
            ordering: currentState.ordering,
            platforms: currentState.platforms,
          });

          set((state) => {
            state.status = LoadingStatus.succeeded;
            state.games.push(...data);
            state.page += 1;
          });
        } catch (error) {
          set((state) => {
            state.error = error.message ?? 'failed load games';
            state.status = LoadingStatus.failed;
            state.throttled = true;
          });
          setTimeout(() => {
            set((state) => {
              state.throttled = false;
            });
          }, THROTTLE_DELAY);
        }
      },
      refetchGames: async () => {
        if (get().throttled) {
          return;
        }

        set((state) => {
          state.status = LoadingStatus.loading;
          state.error = null;
        });

        try {
          const currentState = get();

          const data = await rawgService.fetchGames({
            page: 1,
            pageSize: currentState.pageSize,
            search: currentState.search,
            ordering: currentState.ordering,
            platforms: currentState.platforms,
          });

          set((state) => {
            state.status = LoadingStatus.succeeded;
            state.games = data;
            state.page = 1;
          });
        } catch (error) {
          set((state) => {
            state.error = error.message ?? 'failed load games';
            state.games = [];
            state.status = LoadingStatus.failed;
            state.throttled = true;
          });
          setTimeout(() => {
            set((state) => {
              state.throttled = false;
            });
          }, THROTTLE_DELAY);
        }
      },
      togglePlatform: (id) => {
        set((state) => {
          state.platforms?.forEach((platform) => {
            if (platform.id === id) platform.active = !platform.active;
          });
        });
      },
      setOrder: ({ parameter, value }) => {
        set((state) => {
          state.ordering[parameter] = value;
        });
      },
      setSearch: (search) => {
        set((state) => {
          state.search = search === '' ? null : search;
        });
      },
    }))
  );
};
