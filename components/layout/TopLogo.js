import styled from '@emotion/styled';
import PreviewModal from 'components/preview/PreviewModal';
import LoginModal from 'components/login/LoginModal';
import Link from 'next/link';
import { useState } from 'react';

const TopLogo = ({ hideSetting, isPreview, onLoginClick }) => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  if (isPreview)
    return (
      <>
        <Container>
          {isPreview && (
            <HeaderLeftButton onClick={onLoginClick}>로그인</HeaderLeftButton>
          )}
          <Logo>
            <img src='/icons/logo_300.png' alt='buy2bye logo' />
          </Logo>
          <Setting
            onClick={() => {
              setIsPreviewModalOpen(true);
            }}
          >
            <img src='/icons/setting.png' alt='setting' />
          </Setting>
          <a
            target='_blank'
            href='https://cafe.naver.com/buy2bye/2'
            rel='noreferrer'>
            <Market>
              <img src='/icons/market.png' alt='market' />
            </Market>
          </a>
        </Container>
        <LoginModal
          isOpen={isPreviewModalOpen}
          onCloseClick={() => setIsPreviewModalOpen(false)}
        />
      </>
    );

  return (
    <Container>
      <Logo>
        <img src='/icons/logo_300.png' alt='buy2bye logo' />
      </Logo>
      {!hideSetting && (
        <Link href='/setting' passHref>
          <Setting>
            <img src='/icons/setting.png' alt='setting' />
          </Setting>
        </Link>
      )}
      <a
        target='_blank'
        href='https://m.cafe.naver.com/buy2bye/2'
        rel='noreferrer'>
        <Market>
          <img src='/icons/market.png' alt='market' />
        </Market>
      </a>
    </Container>
  );
};

export default TopLogo;

const Container = styled.div`
  height: 7vw;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  margin: 1vh 0 0 0;
`;

const Logo = styled.div`
  height: 100%;
  img {
    width: auto;
    height: 100%;
  }
`;

const Setting = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: auto;
  height: 90%;
  padding: 0 9px 0 3px;
  background: none;
  display: none;

  img {
    height: 100%;
    width: auto;
    opacity: 0.3;
  }
`;

const Market = styled.button`
  position: absolute;
  top: 0;
  right: 7.5vw;
  width: auto;
  height: 90%;
  padding: 0 6px 0 6px;
  background: none;

  img {
    height: 100%;
    width: auto;
    opacity: 0.3;
  }
`;

const HeaderLeftButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  height: 32px;
  background: transparent;
  padding: 8px;
  color: var(--grey500);
  font-size: 13px;
  z-index: 2;
`;
