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
            href='https://www.naver.com/'
            rel='noreferrer'>
            <Market>
              <img src='/icons/market.png' alt='setting' />
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
      target= '_blank'
      href='https://www.naver.com/'
      rel='noreferrer'>
        <Market>
          <img src='/icons/market.png' alt='setting' />
        </Market>
      </a>
    </Container>
  );
};

export default TopLogo;

const Container = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
`;

const Logo = styled.div`
  width: 100px;
  img {
    width: 100%;
    height: auto;
  }
`;

const Setting = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 60px;
  ppadding: 0 6px 0 6px;
  background: none;

  img {
    height: auto;
    width: 100%;
    opacity: 0.3;
  }
`;

const Market = styled.button`
  position: absolute;
  top: 0;
  right: 40px;
  width: 40px;
  height: 60px;
  ppadding: 0 6px 0 6px;
  background: none;

  img {
    height: auto;
    width: 100%;
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
