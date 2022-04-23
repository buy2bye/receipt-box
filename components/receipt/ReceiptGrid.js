import styled from '@emotion/styled';

const ReceiptGrid = ({ item, onClick }) => {
  return (
    <Container>
      <Thumbnail onClick={onClick} disabled={item.disabled}>
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
`;

const Thumbnail = styled.button`
  cursor: pointer;
  width: 100%;
  max-width: calc((100vw - 48px - 16px) / 3);
  height: auto;
  aspect-ratio: 1/1;
  border-radius: 8px;
  background: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--grey100);

  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
`;
