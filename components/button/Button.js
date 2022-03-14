import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

const Button = ({ className, primary, onClick, children, isLoading }) => {
  return (
    <Container className={className} primary={primary} onClick={onClick}>
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
  height: 60px;
  font-size: 15px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
