import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

const FullScreenSpinner = () => {
  return (
    <Container>
      <CircularProgress color='primary' size={32} />
    </Container>
  );
};

export default FullScreenSpinner;

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
