import React from 'react';
import styled from '@emotion/styled';

import Modal from './Modal';

const HeaderTextModal = ({
  isOpen,
  isPortal,
  onCloseClick,
  children,
  title,
}) => {
  return (
    <Container
      isOpen={isOpen}
      modalBoxStyle={{
        maxWidth: '80vw',
        minWidth: '60vw',
        minHeight: '10vh',
      }}
      isPortal={isPortal}
    >
      <ModalHeader>
        {title}
        <CloseButton onClick={onCloseClick}>
          <img src='/icons/close-button-white.png' alt='close-button' />
        </CloseButton>
      </ModalHeader>
      <DescriptionText>{children}</DescriptionText>
    </Container>
  );
};

HeaderTextModal.defaultProps = {
  noText: '취소',
  yesText: '확인',
  hideNoButton: false,
};

export default HeaderTextModal;

const Container = styled(Modal)`
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3vw;
  font-weight: 400;
  color: var(--primary);
  width: 100%;
  height: 10vw;
  min-height: 40px;
  border-radius: 2vw 2vw 0 0;
  padding: 0 2.5vw;
`;

const DescriptionText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  word-break: keep-all;
  padding: 3.2vw;
  flex: 1;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 3vw;
  right: 3vw;
  width: 2.5vw;
  height: 2.5vw;
  padding: 0;

  img {
    width: 100%;
    height: 100%;
  }
`;
