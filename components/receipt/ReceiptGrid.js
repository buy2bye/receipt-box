import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

const ReceiptGrid = ({ item, onClick, autoClick }) => {
  const containerRef = useRef();

  const handleClick = () => {
    onClick(item, containerRef);
  }

  useEffect(() => {
    if (autoClick) {
      onClick(item, containerRef);
    }
  }, []);

  return (
    <Container ref={containerRef}>
      <Thumbnail onClick={handleClick} disabled={item.disabled}>
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

  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
  }
`;
