import styled from '@emotion/styled';
import Title from 'components/page/Title';
import Layout from 'components/layout/Layout';
import ReceiptPreview from './ReceiptPreview';
import { receiptList } from 'data/previewData';

const ReceiptListPreview = () => {
  return (
    <Layout hideTop showLogo isPreview>
      <HeaderContainer showBorder={receiptList.length > 0}>
        <Title>
          내 물건 리스트 <PreviewText>(예시)</PreviewText>
        </Title>
        <span>전체 {receiptList.length}</span>
      </HeaderContainer>
      <ReceiptList>
        {receiptList.map((item, index) => (
          <ReceiptPreview item={item} key={index} />
        ))}
      </ReceiptList>
    </Layout>
  );
};

export default ReceiptListPreview;

const ReceiptList = styled.div`
  width: 100%;
  height: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

const UploadGuide = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin: 0;
    margin-bottom: 20px;
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
  align-items: flex-end;
  margin-bottom: 12px;
  border-bottom: ${(props) =>
    props.showBorder ? '1px solid var(--grey200)' : 'none'};
  padding-bottom: 12px;

  h2 {
    flex: 8;
    padding-bottom: 0;
  }

  span {
    flex: 2;
    font-size: 14px;
  }
`;

const PreviewText = styled.span`
  font-size: 18px !important;
  color: var(--red) !important;
`;
