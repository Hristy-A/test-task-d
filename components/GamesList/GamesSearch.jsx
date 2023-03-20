import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StyledInput } from '@/styles/Input.styled';
import { useGamesContext } from '@/hooks/useGamesContext';

const InputWrapper = styled.div`
  position: relative;
  flex-grow: 1;
`;

const SearchIcon = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  top: 23%;
  left: 7px;

  &:before {
    content: '';
    position: absolute;
    transition: 0.4s;
    top: 40%;
    left: 40%;
    transform: translate(-50%, -50%);
    border: 1.5px solid ${({ theme }) => theme.colors.textGray};
    border-radius: 50%;
    width: 60%;
    height: 60%;
  }

  &:after {
    content: '';
    position: absolute;
    transition: 0.4s;
    top: 68%;
    left: 50%;
    transform: translateY(-50%) rotate(46deg);
    background: ${({ theme }) => theme.colors.textGray};
    border-radius: 2px;
    overflow: hidden;
    width: 35%;
    height: 1.5px;
  }
`;

const SearchInput = styled(StyledInput)`
  padding: 5px 10px 5px 25px;
  border-radius: 5px;
  width: 100%;
`;

const GamesSearch = (props) => {
  const setSearch = useGamesContext((state) => state.setSearch);
  const refetchGames = useGamesContext((state) => state.refetchGames);
  const search = useGamesContext((state) => state.search);
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(localSearch);
      refetchGames();
    }, 250);

    return () => clearTimeout(timeout);
  }, [localSearch, setSearch, refetchGames]);

  return (
    <InputWrapper>
      <SearchIcon />
      <SearchInput
        {...props}
        onChange={({ target }) => setLocalSearch(target.value)}
      />
    </InputWrapper>
  );
};

export default GamesSearch;
