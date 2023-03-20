import React from 'react';
import styled from 'styled-components';
import { StyledHeader } from '@/styles/Header.styled';
import Ordering from './Ordering';
import GamesSearch from './GamesSearch';
import GamePlatforms from './GamePlatforms';

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const GamesHeader = () => (
  <StyledHeader>
    <Flex>
      <GamePlatforms />
    </Flex>
    <Flex>
      <Ordering />
      <GamesSearch />
    </Flex>
  </StyledHeader>
);

export default GamesHeader;
