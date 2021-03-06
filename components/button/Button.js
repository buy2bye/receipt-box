import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { CircularProgress } from '@mui/material';

const Button = ({
  className,
  primary,
  onClick,
  children,
  isLoading,
  disabled,
}) => {
  return (
    <Container
      className={className}
      primary={primary}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <CircularProgress color='primary' size={26} /> : children}
    </Container>
  );
};

export default Button;

const Container = styled.button`
  background: ${(props) =>
    props.primary ? 'var(--primary)' : 'var(--grey100)'};
  color: ${(props) => (props.primary ? 'var(--grey900)' : 'var(--grey700)')};
  width: 100%;
  height: 14vw;
  font-size: 3.5vw;
  border-radius: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s;

  ${({ disabled }) =>
    disabled &&
    css`
      color: var(--grey400);
    `}
`;
