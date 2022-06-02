import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

const ReceiptGrid = ({
  item,
  onClick,
  autoClick,
  isEditMode,
  selectedItemsOnEditMode,
  setSelectedItemsOnEditMode,
}) => {
  const containerRef = useRef();
  const [isSelectedOnEditMode, setIsSelectedOnEditMode] = useState(false);

  const handleClick = () => {
    if (isEditMode) {
      setIsSelectedOnEditMode(!isSelectedOnEditMode);
      return;
    }

    onClick(item, containerRef);
  };

  useEffect(() => {
    if (autoClick) {
      onClick(item, containerRef);
    }
  }, []);

  useEffect(() => {
    if (isSelectedOnEditMode) {
      setSelectedItemsOnEditMode([...selectedItemsOnEditMode, item.id]);
      return;
    }
    if (isEditMode) {
      setSelectedItemsOnEditMode(
        selectedItemsOnEditMode.filter((itemId) => itemId !== item.id)
      );
    }
  }, [isSelectedOnEditMode]);

  return (
    <Container ref={containerRef}>
      <Thumbnail
        onClick={handleClick}
        disabled={item.disabled}
        isEditMode={isEditMode}
        isSelectedOnEditMode={isSelectedOnEditMode}
      >
        {item.productImage ? (
          <img src={item?.productImage} alt={item?.nickname} />
        ) : (
          <img src='/icons/main-product-placeholder.png' alt='pladeholder' />
        )}
      </Thumbnail>
    </Container>
  );
};

export default ReceiptGrid;

const Container = styled.div`
  position: relative;

  width: calc((100vw - 48px - 16px) / 3);
  height: calc((100vw - 48px - 16px) / 3);
`;

const Thumbnail = styled.button`
  cursor: pointer;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 8px;
  background: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--grey100);
  padding: 0;
  transition: all 0.4s;

  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
  }

  ${({ isEditMode, isSelectedOnEditMode }) =>
    isEditMode &&
    css`
      border: ${isSelectedOnEditMode
        ? '3px solid var(--primary)'
        : '3px solid var(--grey100)'};
    `}
`;
