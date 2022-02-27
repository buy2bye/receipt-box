import styled from '@emotion/styled';
import BottomNav from './BottomNav';
import TopLogo from './TopLogo';
import TopNav from './TopNav';

const Layout = ({ children, className, hideTop, hideBottom, showLogo }) => {
  return (
    <Container>
      {!hideTop && <TopNav />}
      {showLogo && <TopLogo />}
      <Body className={className}>{children}</Body>
      {!hideBottom && <BottomNav />}
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  padding-bottom: 80px;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: scroll;
`;
