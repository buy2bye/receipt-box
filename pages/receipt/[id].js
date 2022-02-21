import styled from '@emotion/styled';
import receiptApi from 'api/receipt';
import Layout from 'components/layout/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ReceiptDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [receipt, setReceipt] = useState();

  useEffect(() => {
    const { getReceiptDetail } = receiptApi();

    getReceiptDetail(id).then((data) => setReceipt(data.data));
  }, []);

  console.log(receipt);

  const imageSkeleton = (
    <div className='thumb'>
      <span>이미지를 준비해 드릴게요</span>
    </div>
  );
  const imageWrapper = (item) => (
    <div className='thumb'>
      <img src={item?.productImage} alt={item?.nickname} />
    </div>
  );

  if (!receipt) {
    return <Container>loading</Container>;
  }

  return (
    <Container>
      <span className='nickname'>{receipt.nickname}</span>
      {receipt.productImage ? imageWrapper(receipt) : imageSkeleton}
      <ul className='details'>
        <li>
          <span>상품명</span>
          <span>{receipt.productName || '업데이트 중...'}</span>
        </li>
        <li>
          <span>구매처</span>
          <span>{receipt.productPlace || '업데이트 중...'}</span>
        </li>
        <li>
          <span>구매가</span>
          <span>
            {receipt.productPrice
              ? `${parseInt(receipt.productPrice).toLocaleString()} 원`
              : '업데이트 중...'}
          </span>
        </li>
        <li>
          <span>구매일자</span>
          <span>{receipt.productDate || '업데이트 중...'}</span>
        </li>
        <li>
          <span>영수증</span>
          <img src={receipt?.imageList[0]} alt={receipt?.productName} />
        </li>
      </ul>
    </Container>
  );
};

export default ReceiptDetail;

const Container = styled(Layout)`
  .nickname {
    margin-bottom: 16px;
  }

  .thumb {
    width: 200px;
    height: 200px;
    background: var(--grey100);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;

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

  .details {
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px 0;
    margin-top: 24px;
    font-size: 14px;
    font-weight: 300;

    li > span:first-child {
      display: inline-block;
      width: 80px;
    }
  }
`;
