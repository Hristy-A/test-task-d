import styled from 'styled-components';

export const StyledInput = styled.input`
  transition: 0.2s;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.lightenGray};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.white};
  }
`;
