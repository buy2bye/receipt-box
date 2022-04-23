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
        maxWidth: '400px',
        minWidth: '256px',
        minHeight: '140px',
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
  font-size: 14px;
  font-weight: 400;
  color: var(--primary);
  width: 100%;
  height: 48px;
  min-height: 40px;
  border-radius: 8px 8px 0 0;
  padding: 0 12px;
`;

const DescriptionText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  word-break: keep-all;
  padding: 16px;
  flex: 1;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 16px;
  height: 16px;
  padding: 0;

  img {
    width: 100%;
    height: 100%;
  }
`;
