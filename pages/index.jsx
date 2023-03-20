import Head from 'next/head';
import { rawgService } from '@/services/rawgService';
import { GamesProvider } from '@/contexts/gamesContext';
import { LoadingStatus } from '@/constants';
import { initialState } from '@/store/useGamesStore';
import GamesList from '@/components/GamesList/GamesList';
import GamesHeader from '@/components/GamesList/GamesHeader';

const Home = ({ state }) => (
  <>
    <Head>
      <title>Game service</title>
    </Head>
    <GamesProvider state={state}>
      <GamesHeader />
      <GamesList />
    </GamesProvider>
  </>
);

export default Home;

export async function getServerSideProps() {
  const state = initialState;

  try {
    state.games = await rawgService.fetchGames();
    state.status = LoadingStatus.succeeded;
    state.page = 1;

    try {
      state.platforms = await rawgService.fetchPlatforms();
    } catch (error) {
      state.platformsError = error.message ?? 'failed load platforms';
    }
  } catch (error) {
    state.status = LoadingStatus.failed;
    state.error = error.message ?? 'failed load games';
  }

  return {
    props: {
      state,
    },
  };
}
