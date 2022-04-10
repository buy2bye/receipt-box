import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const TopNav = ({ topNavColor = 'transparent', onBackClick }) => {
  const router = useRouter();

  return (
    <Container background={topNavColor}>
      <button
        onClick={() => {
          onBackClick ? onBackClick() : router.back();
        }}
      >
        <img src='/icons/left-arrow.png' alt='left-arrow' />
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
  z-index: 1;
  background: ${(props) => props.background};

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
