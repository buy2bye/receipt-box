import styled from '@emotion/styled';
import { calculateDateDiff, calculatePeriod } from 'helpers/utils';
import Link from 'next/link';

const ReceiptGrid = ({ item }) => {
  const dateDiff = calculateDateDiff(item.productDate);

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

  return (
    <Link href={`/receipt/${item.id}`} passHref>
      <Container>
        <Thumbnail>
          {item.productImage ? imageWrapper : imageSkeleton}
        </Thumbnail>
      </Container>
    </Link>
  );
};

export default ReceiptGrid;

const Container = styled.div`
  cursor: pointer;
  width: 100px;
  height: 100px;
  display: flex;
  gap: 16px;

  .thumb {
    height: 90px;
    width: 90px;
    background: var(white);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid var(--grey100);

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
  }

  .name {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
  }

  .date {
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
    color: var(--grey600);

    b {
      font-weight: 400;
    }
  }
`;

const Thumbnail = styled.div``;
