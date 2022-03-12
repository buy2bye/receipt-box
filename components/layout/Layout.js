import styled from '@emotion/styled';
import { useEffect } from 'react';
import BottomNav from './BottomNav';
import TopLogo from './TopLogo';
import TopNav from './TopNav';

const Layout = ({
  children,
  className,
  hideTop,
  hideBottom,
  showLogo,
  hideSetting,
  topNavColor,
  onBackClick,
}) => {
  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container hideTop={hideTop}>
      {!hideTop && (
        <TopNav topNavColor={topNavColor} onBackClick={onBackClick} />
      )}
      {showLogo && <TopLogo hideSetting={hideSetting} />}
      <Body hideBottom={hideBottom} className={className}>
        {children}
      </Body>
      {!hideBottom && <BottomNav />}
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  width: 100vw;
  height: 100vh; /* fallback */
  height: calc(var(--vh) * 100);
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
  position: relative;
  overflow-y: scroll;
`;
