import styled from '@emotion/styled';
import { calculateDateDiff, calculatePeriod } from 'helpers/utils';
import Link from 'next/link';

const Receipt = ({ item }) => {
  const dateDiff = calculateDateDiff(item.productDate);

  const imageSkeleton = (
    <div className='thumb'>
      <span>등록 중</span>
    </div>
  );
  const imageWrapper = (
    <div className='thumb'>
      <img src={item?.productImage} alt={item?.nickname} />
    </div>
  );

  return (
    <Link href={`/receipt/${item.id}`}>
      <Container>
        {item.productImage ? imageWrapper : imageSkeleton}
        <div className='contents'>
          <h3 className='name'>{item?.nickname}</h3>

          {dateDiff.okay && (
            <span className='date'>
              함께한 지 <b>{dateDiff.data.dateDiff}</b>일 째
            </span>
          )}
        </div>
      </Container>
    </Link>
  );
};

export default Receipt;

const Container = styled.div`
  cursor: pointer;
  width: 100%;
  height: 104px;
  display: flex;
  gap: 16px;

  .thumb {
    height: 104px;
    width: 104px;
    background: var(white);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid var(--grey100);

    img {
      width: 80%;
      height: 80%;
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
    justify-content: space-evenly;
  }

  .name {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
  }

  .date {
    font-size: 14px;
    font-weight: 300;
    color: var(--grey600);

    b {
      font-weight: 400;
    }
  }
`;
