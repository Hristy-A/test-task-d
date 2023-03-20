import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledButton } from '@/styles/Button.styled';

const Variant = styled(StyledButton)`
  display: flex;
  border-radius: 5px;
  justify-content: space-between;
  padding: 5px 30px 5px 10px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    right: 15px;
    transition: 0.4s;
    transform: translateY(-0.5px)
      ${({ direction }) => {
        switch (direction) {
          case 'asc':
            return 'rotate(-45deg)';
          case 'desc':
            return 'rotate(45deg)';
          default:
            return 'none';
        }
      }};
    display: ${({ active }) => (active ? 'block' : 'none')};
    width: 8px;
    height: 1.5px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.black};
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    transition: 0.4s;
    transform: translateY(-0.5px)
      ${({ direction }) => {
        switch (direction) {
          case 'asc':
            return 'rotate(45deg)';
          case 'desc':
            return 'rotate(-45deg)';
          default:
            return 'none';
        }
      }};
    display: ${({ active }) => (active ? 'block' : 'none')};
    width: 8px;
    height: 1.5px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.black};
  }
`;

const ordering = [null, 'desc', 'asc'];

const Order = ({ title, desc, asc, onChange }) => {
  const variants = [null, desc, asc];
  const [orderIndex, setOrderIndex] = useState(0);

  const handleClick = () => {
    setOrderIndex((prevOrderIndex) => {
      let newIndex;
      if (prevOrderIndex === variants.length - 1) {
        newIndex = 0;
      } else {
        newIndex = prevOrderIndex + 1;
      }

      onChange(variants[newIndex]);
      return newIndex;
    });
  };

  return (
    <Variant
      active={orderIndex > 0}
      direction={ordering[orderIndex]}
      onClick={handleClick}
    >
      {title}
    </Variant>
  );
};

export default Order;
