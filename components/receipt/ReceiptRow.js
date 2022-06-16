import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { calculateDateDiff } from 'helpers/utils';
import { useEffect, useRef, useState } from 'react';

const ReceiptRow = ({
  item,
  onClick,
  isEditMode,
  selectedItemsOnEditMode,
  setSelectedItemsOnEditMode,
}) => {
  const containerRef = useRef();
  const dateDiff = calculateDateDiff(item.productDate);
  const isSelectedOnEditMode = selectedItemsOnEditMode?.includes(item.id);

  const imageSkeleton = (
    <div className='thumb'>
      <img src='/icons/main-product-placeholder.png' alt='pladeholder' />
    </div>
  );
  const imageWrapper = (
    <div className='thumb'>
      <img src={item?.productImage} alt={item?.nickname} />
    </div>
  );

  const handleClick = () => {
    if (isEditMode) {
      if (isSelectedOnEditMode) {
        selectedItemsOnEditMode.splice(selectedItemsOnEditMode.indexOf(item.id), 1)
        setSelectedItemsOnEditMode([...selectedItemsOnEditMode]);
      } else {
        setSelectedItemsOnEditMode([...selectedItemsOnEditMode, item.id]);
      }
      return;
    }

    onClick(item, containerRef);
  };

  return (
    <Container
      onClick={handleClick}
      disabled={item.disabled}
      ref={containerRef}
      isEditMode={isEditMode}
      isSelectedOnEditMode={isSelectedOnEditMode}
    >
      {item.productImage ? imageWrapper : imageSkeleton}
      <div className='contents'>
        <h3 className='name'>
          {item?.nickname || '내 애장품에게 별명을 지어주세요'}
        </h3>

        {dateDiff.okay && (
          <span className='date'>
            함께한 지 {dateDiff.data.dateDiff.toLocaleString()}일 째
          </span>
        )}
      </div>
    </Container>
  );
};

export default ReceiptRow;

const Container = styled.button`
  cursor: pointer;
  width: 100%;
  height: 27vw;
  display: flex;
  align-items: center;
  gap: 16px;

  .thumb {
    height: 27vw;
    width: 27vw;
    background: var(white);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid var(--grey100);
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }

    span {
      padding: 16px;
      word-break: keep-all;
      color: var(--grey500);
      font-size: 13px;
    }
  }

  .contents {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
  }

  .name {
    margin: 0;
    font-size: 3.0vw;
    font-weight: 400;
  }

  .date {
    margin-top: 8px;
    font-size: 3.0vw;
    font-weight: 300;
    color: var(--grey600);

    b {
      font-weight: 400;
    }
  }

  ${({ isEditMode, isSelectedOnEditMode }) =>
    isEditMode &&
    css`
      .thumb {
        border: ${isSelectedOnEditMode
          ? '3px solid var(--primary)'
          : '3px solid var(--grey100)'};

        :before {
          content: '';
          width: 10px;
          height: 10px;
          background: ${isSelectedOnEditMode ? 'var(--primary)' : 'white'};
          border: 2px solid
            ${isSelectedOnEditMode ? 'var(--primary)' : 'var(--grey200)'};
          position: absolute;
          top: 8%;
          left: 8%;
          border-radius: 50%;
        }
      }
    `}
`;
