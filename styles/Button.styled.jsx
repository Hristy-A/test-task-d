import styled from 'styled-components';

export const StyledButton = styled.button`
  transition: 0.2s;
  color: ${({ theme, active }) =>
    active ? theme.colors.black : theme.colors.textGray};
  background: ${({ theme, active }) =>
    active ? theme.colors.white : theme.colors.gray};

  &:hover {
    color: ${({ theme, active }) => !active && theme.colors.white};
    background: ${({ theme, active }) => !active && theme.colors.lightenGray};
  }
`;
