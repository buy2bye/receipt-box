import styled from '@emotion/styled';
import { calculateDateDiff, calculatePeriod } from 'helpers/utils';
import Link from 'next/link';

const ReceiptGrid = ({ item }) => {
  const dateDiff = calculateDateDiff(item.productDate);

  return (
    <Container>
      <Link href={`/receipt/${item.id}`} passHref>
        <Thumbnail>
          {item.productImage ? (
            <img src={item?.productImage} alt={item?.nickname} />
          ) : (
            <img src='/icons/main-product-placeholder.png' alt='pladeholder' />
          )}
        </Thumbnail>
      </Link>
    </Container>
  );
};

export default ReceiptGrid;

const Container = styled.div`
  cursor: pointer;
`;

const Thumbnail = styled.div`
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
