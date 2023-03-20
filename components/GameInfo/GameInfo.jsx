import { Inter } from 'next/font/google';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { formatDate } from '@/utils/formatDate';
import Slider from '../ui/Slider';

const inter = Inter({ subsets: ['latin'], weight: '400' });

const GridContainer = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(1, 1fr);
  margin-bottom: 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify ?? 'start'};
  align-items: ${({ align }) => align ?? 'stretch'};
  margin-bottom: 20px;
`;

const Title = styled.h1`
  width: 50vw;
  font-size: 2rem;
  margin-bottom: 15px;
`;

const Rating = styled.div`
  display: inline-flex;
  align-items: baseline;
  font-size: 1rem;
  padding: 5px 10px;
  background: ${({ theme }) => theme.colors.lightenGray};
  border-radius: 5px;
  margin-right: 10px;

  img {
    margin-right: 5px;
  }

  span {
    line-height: 14px;
    font-size: 14px;
  }
`;

const Website = styled.a`
  display: inline-flex;
  font-size: 1rem;
  padding: 5px 10px;
  background: ${({ theme }) => theme.colors.lightenGray};
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
  user-select: none;
  color: ${({ theme }) => theme.colors.white};
  transition: 0.2s;

  span {
    display: inline-block;
    margin-left: 4px;
    transform: translateX(0px);
    transition: 0.2s;
  }

  &:hover span {
    transform: translateX(4px);
  }
`;

const Released = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textGray};
  font-size: 1rem;
  padding: 5px 10px;
  background: ${({ theme }) => theme.colors.lightenGray};
  border-radius: 5px;

  div:nth-child(2n) {
    color: ${({ theme }) => theme.colors.white};
  }

  width: 200px;
`;

const Description = styled.p`
  line-height: 1.3rem;
  font-weight: 300;
`;

const GameInfo = ({ game }) => (
  <>
    <GridContainer>
      <div>
        <Title>{game.name} </Title>
        <Flex justify="start" align="center">
          <Rating>
            <Image src="/star.svg" width={12} height={12} alt="star" />{' '}
            {game.rating}
          </Rating>
          <Website
            target="_blank"
            href={game.website}
            className={inter.className}
          >
            website <span>-&gt;</span>
          </Website>
          <Released>
            <div>Release date:</div>
            <div>{formatDate(game.released)}</div>
          </Released>
        </Flex>
      </div>
      <div>
        <Slider>
          {game.screenshots.map(({ id, image }) =>
            image ? (
              <Image
                key={id}
                src={image}
                width={350}
                height={200}
                alt="screenshot"
                priority
              />
            ) : (
              <Image
                key={id}
                src="/noimage.png"
                width={552}
                height={414}
                alt="screenshot"
              />
            )
          )}
        </Slider>
      </div>
    </GridContainer>
    <Description>{game.description}</Description>
  </>
);

export default GameInfo;
