import styled from '@emotion/styled';
import Modal from 'components/modal/Modal';
import Head from 'next/head';
import Script from 'next/script';
import LoginButton from './LoginButton';

const LoginModal = ({ isOpen, onCloseClick }) => {
  return (
    <Container isOpen={isOpen}>
      <ModalHeader>
        <Logo>
          <img src='/icons/logo_300.png' alt='buy2bye logo' />
        </Logo>
        <CloseButton onClick={onCloseClick}>
          <img src='/icons/close-button.png' alt='close-button' />
        </CloseButton>
      </ModalHeader>
      <Description>서비스 이용을 위해서는 로그인이 필요합니다.</Description>
      <LoginButton type='kakao' />
      <LoginButton type='email' />
      <LoginButton type='apple' />
    </Container>
  );
};

export default LoginModal;

const Container = styled(Modal)`
  width: 260px;
  display: flex;
  flex-direction: column;
  padding: 0 16px 16px 16px;
`;

const ModalHeader = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: Center;
`;

const Description = styled.span`
  font-size: 14px;
  font-weight: 300;
  padding: 12px 8px;
`;

const Logo = styled.div`
  width: 80px;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    height: auto;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 16px;
  height: 16px;
  padding: 0;

  img {
    width: 100%;
    height: 100%;
  }
`;
