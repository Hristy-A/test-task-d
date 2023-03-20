import React from 'react';
import styled from 'styled-components';
import { StyledButton } from '@/styles/Button.styled';
import { useGamesContext } from '@/hooks/useGamesContext';

const Platforms = styled.div`
  color: ${({ theme }) => theme.colors.textGray};
`;

const PlatformButton = styled(StyledButton)`
  padding: 5px 10px;
  border-radius: 20px;
`;

const GamePlatforms = () => {
  const error = useGamesContext((state) => state.platformsError);
  const platforms = useGamesContext((state) => state.platforms);
  const togglePlatform = useGamesContext((state) => state.togglePlatform);
  const refetchGames = useGamesContext((state) => state.refetchGames);

  const handleTogglePlatform = (id) => {
    togglePlatform(id);
    refetchGames();
  };

  return (
    <>
      <Platforms>Choose platforms:</Platforms>
      {error ||
        platforms?.map(({ id, name, active }) => (
          <PlatformButton
            key={id}
            active={active}
            onClick={() => handleTogglePlatform(id)}
          >
            {name}
          </PlatformButton>
        ))}
    </>
  );
};

export default GamePlatforms;
