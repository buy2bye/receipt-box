import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const TopNav = ({
  topNavColor = 'transparent',
  onBackClick,
  style
}) => {
  const router = useRouter();

  return (
    <Container background={topNavColor} style={style}>
      <button
        onClick={() => {
          onBackClick ? onBackClick() : router.back();
        }}
      >
        &lt;
        {/* <img src='/icons/left-arrow.png' alt='left-arrow' /> */}
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

    color: black;
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
    font-size: 30px;
    font-weight: 100;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;
