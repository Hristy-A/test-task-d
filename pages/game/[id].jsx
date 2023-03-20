import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Inter } from 'next/font/google';
import { StyledButton } from '@/styles/Button.styled';
import { StyledHeader } from '@/styles/Header.styled';
import { StyledContainer } from '@/styles/Container.styled';
import { rawgService } from '@/services/rawgService';
import GameInfo from '@/components/GameInfo/GameInfo';

const inter = Inter({ subsets: ['latin'], weight: '400' });

const MainWrapper = styled.div`
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.6) 0%,
      ${({ theme }) => theme.colors.background} 60vw
    ),
    url(${(props) => props.poster}) 0 0/100% no-repeat;
  min-height: 100vh;
  padding-bottom: 20px;
`;

const BackButton = styled(StyledButton)`
  padding: 5px 10px;
  border-radius: 5px;
`;

const GamePage = ({ game }) => {
  const { back } = useRouter();

  return (
    <>
      <Head>
        <title>{game.name}</title>
      </Head>
      <MainWrapper poster={game.poster}>
        <StyledHeader>
          <BackButton className={inter.className} onClick={back}>
            &lt;- Back
          </BackButton>
        </StyledHeader>
        <StyledContainer>
          <GameInfo game={game} />
        </StyledContainer>
      </MainWrapper>
    </>
  );
};

export default GamePage;

export async function getServerSideProps({ params }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return { notFound: true };

  try {
    const game = await rawgService.fetchGame(id);

    return {
      props: {
        game,
      },
    };
  } catch (error) {
    if (error.status === 404) {
      return { notFound: true };
    }
  }
}
