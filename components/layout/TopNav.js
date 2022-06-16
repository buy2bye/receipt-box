import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const TopNav = ({ topNavColor = 'transparent', onBackClick, title, style }) => {
  const router = useRouter();

  return (
    <Container background={topNavColor} style={style}>
      <button
        onClick={() => {
          onBackClick ? onBackClick() : router.back();
        }}
      >
        &lt;
      </button>
      <NavTitle>{title}</NavTitle>
    </Container>
  );
};

export default TopNav;

const Container = styled.div`
  width: 100vw;
  height: 4vh;
  padding: 0 1.8vw;
  display: flex;
  align-items: center;
  position: sticky;
  z-index: 1;
  background: ${(props) => props.background};
  margin-left: 3vw;

  button {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background: transparent;
    padding: 0;

    color: var(--grey300);
    font-size: 5.4vw;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const NavTitle = styled.div`
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
`;
