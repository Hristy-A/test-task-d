import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { formatDate } from '@/utils/formatDate';

const GameCard = styled.div`
  background: ${({ theme }) => theme.colors.gray};
  border-radius: 10px;
  overflow: hidden;
  transition: 0.3s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const CardInfo = styled.div`
  padding: 20px 10px;
`;

const Title = styled(Link)`
  display: block;
  font-size: 2rem;
  margin-bottom: 10px;
  user-select: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  transition: 0.2s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${({ theme }) => theme.colors.textGray};
    }
  }
`;

const Rating = styled.div`
  display: inline-flex;
  align-items: baseline;
  padding: 4px 6px;
  background: ${({ theme }) => theme.colors.lightenGray};
  margin-bottom: 10px;
  border-radius: 5px;

  img {
    margin-right: 5px;
  }

  span {
    line-height: 14px;
    font-size: 14px;
  }
`;

const Released = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textGray};

  div:nth-child(2n) {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 280px;

  & > img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const GameItem = ({ game }) => (
  <GameCard>
    <ImageContainer>
      {game.poster ? (
        <Image
          src={game.poster}
          width={420}
          height={280}
          alt={`${game.name} poster`}
        />
      ) : (
        <Image src="/noimage.png" width={280} height={280} alt="screenshot" />
      )}
    </ImageContainer>
    <CardInfo>
      <Title href={`/game/${game.id}`}>{game.name}</Title>
      <Rating>
        <Image src="/star.svg" width={12} height={12} alt="star" />
        <span>{game.rating}</span>
      </Rating>
      <Released>
        <div>Release date:</div>
        <div>{formatDate(game.released)}</div>
      </Released>
    </CardInfo>
  </GameCard>
);

export default GameItem;
