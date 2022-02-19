import styled from '@emotion/styled';
import BottomNav from './BottomNav';
import TopNav from './TopNav';

const Layout = ({ children, className, hideTop, hideBottom }) => {
  return (
    <Container>
      {!hideTop && <TopNav />}
      <Body className={className}>{children}</Body>
      {!hideBottom && <BottomNav />}
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: scroll;
`;
