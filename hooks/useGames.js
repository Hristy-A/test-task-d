import { useInfinityScroll } from './useInfinityScroll';
import { useGamesContext } from './useGamesContext';
import { LoadingStatus } from '@/constants';

export function useGames() {
  const games = useGamesContext((state) => state.games);
  const status = useGamesContext((state) => state.status);
  const error = useGamesContext((state) => state.error);
  const pageSize = useGamesContext((state) => state.pageSize);

  const fetchGames = useGamesContext((state) => state.fetchGames);

  useInfinityScroll(fetchGames);

  return {
    games,
    isLoading: status === LoadingStatus.loading,
    error,
    pageSize,
  };
}
