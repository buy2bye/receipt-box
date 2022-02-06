import styled from '@emotion/styled';

const Tutorial = ({ className }) => {
  return <Container className={className}>tutorial page</Container>;
};

export default Tutorial;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
