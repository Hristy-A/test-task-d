import { useRef, createContext } from 'react';
import { createGamesStore } from '@/store/useGamesStore';

export const GamesContext = createContext(null);

export function GamesProvider({ children, state }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = createGamesStore(state);
  }
  return (
    <GamesContext.Provider value={storeRef.current}>
      {children}
    </GamesContext.Provider>
  );
}
