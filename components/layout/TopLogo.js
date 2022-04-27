import styled from '@emotion/styled';
import PreviewModal from 'components/preview/PreviewModal';
import LoginModal from 'components/login/LoginModal';
import Link from 'next/link';
import { useState } from 'react';

const TopLogo = ({ hideSetting, isPreview }) => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  if (isPreview)
    return (
      <>
        <Container>
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
  width: 60px;
  height: 60px;
  background: none;

  img {
    height: 40%;
    width: auto;
    opacity: 0.3;
  }
`;
