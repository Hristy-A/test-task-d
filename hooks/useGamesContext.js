import { useContext } from 'react';
import { useStore } from 'zustand';
import { GamesContext } from '@/contexts/gamesContext';

export function useGamesContext(selector) {
  const store = useContext(GamesContext);
  if (!store) throw new Error('Missing GamesContext.Provider in the tree');
  return useStore(store, selector);
}
