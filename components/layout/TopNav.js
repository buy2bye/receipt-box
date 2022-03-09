import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const TopNav = () => {
  const router = useRouter();

  return (
    <Container>
      <button onClick={() => router.back()}>
        <img src='/icons/left-arrow.png' />
      </button>
    </Container>
  );
};

export default TopNav;

const Container = styled.div`
  width: 100vw;
  height: 50px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  position: sticky;
  z-index: 10;

  button {
    position: relative;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    background: transparent;
    padding: 0;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;
