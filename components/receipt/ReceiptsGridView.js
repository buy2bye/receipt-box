import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import ReceiptGrid from './ReceiptGrid';

const ReceiptsGridView = ({
  receiptList,
  onItemClick,
  isPreview,
  isEditMode,
  selectedItemsOnEditMode,
  setSelectedItemsOnEditMode,
}) => {
  const isEmpty = receiptList.length < 1;

  const handleItemClick = (item, containerRef) => {
    const rect = containerRef.current.getBoundingClientRect();
    const top = containerRef.current.offsetTop + rect.height * 0.8;
    let left = containerRef.current.offsetLeft;

    if (window.innerWidth * 0.51 < left) {
      // is right
      onItemClick(item, left + rect.width * 0.3, top, -100);
    } else if (window.innerWidth * 0.2 > left) {
      // is left
      onItemClick(item, left + rect.width * 0.7, top, 0);
    } else {
      // is center
      onItemClick(item, left + rect.width * 0.5, top, -50);
    }
  };

  return (
    <Container isEmpty={isEmpty} isEditMode={isEditMode}>
      {isEmpty && (
        <UploadGuide>
          <h3>등록된 애장품이 없어요.</h3>
          <span>오른쪽 아래의 + 버튼을 눌러</span>
          <span>애장품을 등록하세요!</span>
        </UploadGuide>
      )}
      {receiptList.map((item, index) => (
        <ReceiptGrid
          item={item}
          key={index}
          onClick={handleItemClick}
          autoClick={isPreview && 0 === index}
          isEditMode={isEditMode}
          selectedItemsOnEditMode={selectedItemsOnEditMode}
          setSelectedItemsOnEditMode={setSelectedItemsOnEditMode}
        />
      ))}
    </Container>
  );
};

export default ReceiptsGridView;

const Container = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;

  ${({ isEmpty }) =>
    !isEmpty &&
    css`
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-row-gap: 2.5vw;
      grid-column-gap: 2.5vw;
    `}

  ${({ isEditMode }) => 
    isEditMode &&`
    margin-bottom: 100px
    `}
`;

const UploadGuide = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin: 40px 0 0 0;
    margin-bottom: 20px;
    font-size: 16px;
    color: var(--grey600);
  }

  span {
    font-size: 14px;
    line-height: 20px;
    color: var(--grey500);
  }
`;
