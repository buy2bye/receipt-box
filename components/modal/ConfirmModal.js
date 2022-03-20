import React from 'react';
import styled from '@emotion/styled';

import Modal from './Modal';
import { css } from '@emotion/react';

const ConfirmModal = ({
  isOpen,
  titleText,
  descriptionText,
  noText,
  yesText,
  hideNoButton,
  isPortal,
  onNoClick,
  onYesClick,
}) => {
  return (
    <Container isOpen={isOpen} isPortal={isPortal}>
      <WrapContents>
        {titleText && <TitleText>{titleText}</TitleText>}
        <DescriptionText>{descriptionText}</DescriptionText>
      </WrapContents>
      <WrapButtons>
        {!hideNoButton && (
          <Button secondary variant='basic' onClick={onNoClick}>
            {noText}
          </Button>
        )}
        <Button primary variant='primary' onClick={onYesClick}>
          {yesText}
        </Button>
      </WrapButtons>
    </Container>
  );
};

ConfirmModal.defaultProps = {
  noText: '취소',
  yesText: '확인',
  hideNoButton: false,
};

export default ConfirmModal;

const Container = styled(Modal)`
  max-width: 400px;
  min-width: 256px;
  min-height: 140px;
  display: flex;
  flex-direction: column;
`;

const WrapContents = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.div`
  font-size: 16px;
  padding: 4px;
  margin-bottom: 8px;
`;

const DescriptionText = styled.div`
  font-size: 14px;
  padding: 4px;
`;

const WrapButtons = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  font-size: 13px;
  color: var(--grey900);

  ${(props) =>
    props.primary
      ? css`
          background: var(--primary);
          border-radius: 0 0 12px 0;
        `
      : css`
          background: var(--grey100);
          border-radius: 0 0 0 12px;
        `}
`;
