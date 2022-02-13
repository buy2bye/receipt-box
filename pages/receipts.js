import styled from '@emotion/styled';
import WrapAuthPage from 'helpers/AuthWrapper';
import Title from 'components/page/Title';
import Subtitle from 'components/page/Subtitle';
import Layout from 'components/layout/Layout';
import { useState } from 'react';

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
  const [imageSrc, setImageSrc] = useState('');

  const handleImageOnChange = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    const files = event.target.files;

    reader.onload = function (event) {
      // 썸네일 이미지 경로 설정
      setImageSrc(event.target.result);
    };

    if (files[0]) reader.readAsDataURL(files[0]);
  };

  if (receiptList.length < 4)
    return (
      <Layout>
        <Container>
          <Title>등록된 영수증이 없어요</Title>
          <Subtitle>스마트폰 캡쳐화면도 등록할 수 있어요 🙂</Subtitle>
          <RegisterButton htmlFor='upload-photo'>
            영수증 등록하기
          </RegisterButton>
          <input
            type='file'
            id='upload-photo'
            accept='image/*'
            onChange={handleImageOnChange}
          />
          <ImageList>
            <Thumbnail>
              {imageSrc ? (
                <img src={imageSrc} alt='receipt-thumbnail' />
              ) : (
                <span>
                  이미지
                  <br />
                  보이는 곳
                </span>
              )}
            </Thumbnail>
          </ImageList>
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

  input {
    display: none;
  }
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

const RegisterButton = styled.label`
  background: var(--blue500);
  color: white;
  width: 200px;
  height: 60px;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageList = styled.ul`
  margin-top: 20px;
  width: 100%;
  height: 160px;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const Thumbnail = styled.li`
  width: 160px;
  height: 160px;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 14px;
    text-align: center;
    color: var(--grey300);
    line-height: 1.6;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;
