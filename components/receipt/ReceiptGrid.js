import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ReceiptGrid = ({ item }) => {
  const router = useRouter();
  const [isSummaryShown, setIsSummaryShown] = useState(false);

  const handleShowDetailClick = () => {
    router.push(`/receipt/${item.id}`);
  };

  return (
    <Container>
      <Thumbnail onClick={() => setIsSummaryShown(true)}>
        {item.productImage ? (
          <img src={item?.productImage} alt={item?.nickname} />
        ) : (
          <img src='/icons/main-product-placeholder.png' alt='pladeholder' />
        )}
      </Thumbnail>
      {isSummaryShown && <SummaryPopup>this is summary</SummaryPopup>}
    </Container>
  );
};

export default ReceiptGrid;

const Container = styled.div`
  position: relative;
`;

const Thumbnail = styled.div`
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

  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
`;

const SummaryPopup = styled.div`
  position: fixed;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: lightgrey;
  border-radius: 8px;
  z-index: 10;
`;
