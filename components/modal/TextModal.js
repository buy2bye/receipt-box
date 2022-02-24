import React from 'react';
import styled from '@emotion/styled';

import Modal from './Modal';

const TextModal = ({
  isOpen,
  titleText,
  descriptionText,
  noText,
  yesText,
  hideNoButton,
  isPortal,
  onNoClick,
  onYesClick,
  onInputChange,
}) => {
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
      {titleText && <TitleText>{titleText}</TitleText>}
      <DescriptionText>{descriptionText}</DescriptionText>
      <TextInput
        type='text'
        placeholder='새로운 닉네임을 입력하세요'
        onChange={onInputChange}
      />
      <WrapButtons>
        {!hideNoButton && (
          <Button id='noBtn' variant='basic' onClick={onNoClick}>
            {noText}
          </Button>
        )}
        <Button id='yesBtn' variant='primary' onClick={onYesClick}>
          {yesText}
        </Button>
      </WrapButtons>
    </Modal>
  );
};

TextModal.defaultProps = {
  noText: '취소',
  yesText: '확인',
  hideNoButton: false,
};

export default TextModal;

const TitleText = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const DescriptionText = styled.div`
  flex: 1;
  font-size: 14px;
  margin-bottom: 8px;
`;

const TextInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 8px;
  border-radius: 4px;
  border: 1px solid black;
`;

const WrapButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
`;

const Button = styled.button`
  background: white;
  width: 100%;
  height: 40px;
  border: 1px solid black;
  border-radius: 4px;
`;
