import styled from '@emotion/styled';
import Title from 'components/page/Title';
import Subtitle from 'components/page/Subtitle';
import Layout from 'components/layout/Layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import receiptApi from 'api/receipt';
import Receipt from './Receipt';

const ReceiptListPage = () => {
  const [receiptList, setReceiptList] = useState();
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    const { getReceipts } = receiptApi();
    getReceipts().then((data) => {
      setReceiptList(data.data.receiptList);
      setTotalCount(data.data.totalCount);
    });
  }, []);

  if (!receiptList) return <Layout hideTop>loading...</Layout>;

  return (
    <Layout hideTop showLogo>
      {receiptList.length < 1 && (
        <UploadGuideHeader>
          <Title>내 물건 영수증을 등록해보세요 🙂</Title>
          <Subtitle>온라인 주문내역 캡쳐화면도 등록할 수 있어요 </Subtitle>
        </UploadGuideHeader>
      )}
      <HeaderContainer>
        <Title>내 물건 List</Title>
        <span>전체 {totalCount}</span>
      </HeaderContainer>
      <ReceiptList>
        {receiptList.length < 1 && (
          <UploadGuide>
            <h3>등록된 영수증이 없어요.</h3>
            <span>아래 카메라 버튼을 눌러</span>
            <span>영수증을 촬영하세요!</span>
          </UploadGuide>
        )}
        {receiptList.map((item, index) => (
          <Receipt item={item} key={index} />
        ))}
      </ReceiptList>
    </Layout>
  );
};

export default ReceiptListPage;

const ReceiptList = styled.div`
  width: 100%;
  height: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

const UploadGuideHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--grey200);
  margin-bottom: 20px;
`;

const UploadGuide = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin: 0;
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 16px;
    color: var(--grey600);
  }

  span {
    font-size: 14px;
    line-height: 20px;
    color: var(--grey500);
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid var(--grey100);
  margin-bottom: 16px;

  h2 {
    flex: 8;
    padding-bottom: 16px;
  }

  span {
    flex 2;
    font-size: 14px;
    padding-bottom: 24px;
  }
`;
