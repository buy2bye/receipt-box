import styled from '@emotion/styled';
import WrapAuthPage from 'helpers/AuthWrapper';
import Title from 'components/page/Title';
import Subtitle from 'components/page/Subtitle';
import Layout from 'components/layout/Layout';

const receiptList = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

const ReceiptListPage = () => {
  if (receiptList.length < 4)
    return (
      <Layout>
        <Container>
          <Title>등록된 영수증이 없어요</Title>
          <Subtitle>스마트폰 캡쳐화면도 등록할 수 있어요 🙂</Subtitle>
          <RegisterButton>영수증 등록하기</RegisterButton>
          <input type='file' name='file' accept='image/*, .pdf' />
        </Container>
      </Layout>
    );

  return (
    <Layout>
      <Container>
        <Title>나의 영수증 보관함</Title>
        <ReceiptList>
          {receiptList.map((item, index) => (
            <Receipt item={item} key={index} />
          ))}
        </ReceiptList>
      </Container>
    </Layout>
  );
};

// export default WrapAuthPage(ReceiptListPage);
export default ReceiptListPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  overflow-y: scroll;
`;

const ReceiptList = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Receipt = styled.div`
  background: var(--blue200);
  width: 100%;
  height: 100px;
  border-radius: 16px;
`;

const RegisterButton = styled.button`
  background: var(--blue500);
  color: white;
  width: 200px;
  height: 60px;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 20px;
`;
