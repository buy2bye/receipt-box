import styled from '@emotion/styled';

const Button = ({ primary, onClick, children }) => {
  return (
    <Container primary={primary} onClick={onClick}>
      {children}
    </Container>
  );
};

export default Button;

const Container = styled.button`
  background: ${(props) =>
    props.primary ? 'var(--blue500)' : 'var(--grey100)'};
  color: ${(props) => (props.primary ? 'white' : 'var(--grey700)')};
  width: 100%;
  height: 60px;
  font-size: 15px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
