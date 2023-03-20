import React from 'react';
import styled from 'styled-components';
import { StyledContainer } from '@/styles/Container.styled';
import { useGames } from '@/hooks/useGames';
import GameItem from './GameItem';

const GamesContainer = styled(StyledContainer)`
  display: grid;
  grid-template-columns: repeat(1, minmax(100px, auto));
  gap: 30px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const GamesList = () => {
  const { games, isLoading, error } = useGames();

  if (error) {
    <div>{error}</div>;
  }
  return (
    <GamesContainer>
      {games.map((game) => (
        <GameItem key={game.id} game={game} />
      ))}
      {isLoading && <div>Loading</div>}
    </GamesContainer>
  );
};

export default GamesList;
