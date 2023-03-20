import { Inter } from 'next/font/google';
import React, { Children, cloneElement, useState } from 'react';
import styled from 'styled-components';

const inter = Inter({ subsets: ['latin'], weight: '400' });

const ITEM_WIDTH = 350;

const SliderContainer = styled.div`
  height: 200px;
  width: ${ITEM_WIDTH}px;
  display: flex;
  align-items: center;
`;

const SliderViewport = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const ItemsContainer = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${({ offset }) => offset}px);
`;

const MoveButton = styled.button`
  white-space: nowrap;
  background: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 2rem;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const prepareNodes = (children) =>
  Children.map(children, (child) =>
    cloneElement(child, {
      style: {
        height: '100%',
        minWidth: `${ITEM_WIDTH}px`,
        maxWidth: `${ITEM_WIDTH}px`,
      },
    })
  );

const Slider = ({ children }) => {
  const [items, setItems] = useState(() => prepareNodes(children));
  const [offset, setOffset] = useState(0);

  const handleLeftArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + ITEM_WIDTH;
      return Math.min(newOffset, 0);
    });
  };
  const handleRightArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - ITEM_WIDTH;

      const maxOffset = -(ITEM_WIDTH * (items.length - 1));

      return Math.max(newOffset, maxOffset);
    });
  };

  return (
    <SliderWrapper>
      <MoveButton onClick={handleLeftArrowClick} className={inter.className}>
        &lt;-
      </MoveButton>
      <SliderContainer>
        <SliderViewport>
          <ItemsContainer offset={offset}>{children}</ItemsContainer>
        </SliderViewport>
      </SliderContainer>
      <MoveButton onClick={handleRightArrowClick} className={inter.className}>
        -&gt;
      </MoveButton>
    </SliderWrapper>
  );
};

export default Slider;
