import React from 'react';
import styled from '@emotion/styled';

import Modal from './Modal';

const TextModal = ({ isOpen, isPortal, onCloseClick, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      modalBoxStyle={{
        maxWidth: '400px',
        minWidth: '256px',
        minHeight: '140px',
        padding: '16px',
      }}
      isPortal={isPortal}
    >
      <DescriptionText>{children}</DescriptionText>
      <CloseButton id='noBtn' variant='basic' onClick={onCloseClick}>
        <img src='/icons/close-button.png' alt='close-button' />
      </CloseButton>
    </Modal>
  );
};

TextModal.defaultProps = {
  noText: '취소',
  yesText: '확인',
  hideNoButton: false,
};

export default TextModal;

const DescriptionText = styled.div`
  padding: 8px 0;
  width: 90%;
  font-size: 14px;
  line-height: 1.4;
  word-break: keep-all;
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
