import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import BottomNav from './BottomNav';
import TopBanner from './TopBanner';
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
  topNavInBody,
  onBackClick,
  isPreview,
  onLoginClick,
  navTitle,
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
      <TopBanner />
      <BodyWrapper>
        {!hideTop && !topNavInBody && (
          <TopNav
            topNavColor={topNavColor}
            onBackClick={onBackClick}
            title={navTitle}
          />
        )}
        {showLogo && (
          <TopLogo
            hideSetting={hideSetting}
            isPreview={isPreview}
            onLoginClick={onLoginClick}
          />
        )}
        <Body hideBottom={hideBottom} className={className}>
          {!hideTop && topNavInBody && (
            <TopNav
              topNavColor={topNavColor}
              onBackClick={onBackClick}
              style={{
                marginTop: '-12px',
              }}
            />
          )}
          {children}
        </Body>
        {!hideBottom && <BottomNav isPreview={isPreview} />}
      </BodyWrapper>
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

const BodyWrapper = styled.div`
  width: 100%;
  height: auto;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 24px 24px 24px;
  width: 100vw;
  position: relative;
  overflow-y: scroll;
`;
