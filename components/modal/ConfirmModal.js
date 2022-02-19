import React from 'react'
import styled from '@emotion/styled'

import Modal from './Modal'

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
    <Modal
      isOpen={isOpen}
      modalBoxStyle={{
        maxWidth: '400px',
        minWidth: '256px',
        minHeight: '140px',
        padding: '16px'
      }}
      isPortal={isPortal}
    >
      {titleText && <TitleText>{titleText}</TitleText>}
      <DescriptionText>{descriptionText}</DescriptionText>
      <WrapButtons>
        {!hideNoButton && (
          <Button
            id="noBtn"
            variant="basic"
            onClick={onNoClick}
          >
            {noText}
          </Button>
        )}
        <Button
          id="yesBtn"
          variant="primary"
          onClick={onYesClick}
        >
          {yesText}
        </Button>
      </WrapButtons>
    </Modal>
  )
}

ConfirmModal.defaultProps = {
  noText: '취소',
  yesText: '확인',
  hideNoButton: false
}

export default ConfirmModal

const TitleText = styled.div`
  font-size: 16px;
  padding: 4px;
  margin-bottom: 8px;
`

const DescriptionText = styled.div`
  flex: 1;

  font-size: 16px;
  padding: 4px;
  margin-bottom: 28px;
`

const WrapButtons = styled.div`
  display: flex;
  justify-content: center;

  > button:last-child {
    margin-left: 8px;
  }
`

const Button = styled.button`
  background: white;
  width: 100%;
  height: 40px;
  border: 1px solid black;
  border-radius: 4px;
`
