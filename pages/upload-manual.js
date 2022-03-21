import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { setCookie } from 'helpers/cookie';
import apiController from 'helpers/apiController';
import Title from 'components/page/Title';
import Button from 'components/button/Button';
import Layout from 'components/layout/Layout';

//호진 영수증 수기등록 테스트
import receiptApi from 'api/receipt';
import { useContext } from 'react';
import { ImageContext } from 'contexts/ImageContext';

const Signup = () => {
    const router = useRouter();
  
    const [nickname, setNickname] = useState('');
    const { imageSrc, changeImageSrc, imageFile, changeImageFile } =
    useContext(ImageContext);

    const handleUpload = async () => {
        //닉네임까지 입력 후 최종 영수증 업로드
        if (!nickname) {
            alert('닉네임을 입력해주세요.');
            return;
        }
        const { createReceipt } = receiptApi();
        createReceipt(nickname, imageFile)
          .then((res) => {
            alert('영수증이 등록되었습니다.');
            router.push('/');
          })
          .catch(({ response: res }) => {
            alert('영수증 등록에 실패했습니다.');
          });
      };
  
    return (
      <>
        <Container
          hideBottom
        >
          <Title>직접등록하기</Title>
          <SignupForm> 
            <TextInput>
              <input
                type='text'
                placeholder='ex)아이폰13프로'
                id='nickname'
                onChange={(e) => setNickname(e.target.value)}
              />
              <label htmlFor='nickname'>물건닉네임</label>
            </TextInput>  
          </SignupForm>
          <Buttons>
            <Button
                primary onClick={handleUpload}
            >
              등록하기
            </Button>
          </Buttons>
        </Container>
      </>
    );
  };
  
export default Signup;

const Container = styled(Layout)``;
  
const SignupForm = styled.div`
width: 100%;
flex: 1;
display: flex;
flex-direction: column;
gap: 12px;
margin-bottom: 16px;
`;

const TextInput = styled.div`
position: relative;
font-size: 14px;

label {
  position: absolute;
  top: 8px;
  left: 12px;
  color: var(--grey700);
}

input {
  width: 100%;
  height: 60px;
  border-radius: 8px;
  padding: 24px 12px 0 12px;
  font-size: 16px;
  font-weight: 400;
  border: none;
  border: 1px solid var(--grey400);
  color: var(--grey900);
  font-weight: 300;

  ::placeholder {
    color: var(--grey400);
    font-weight: 300;
    font-size: 14px;
  }
}
`;

const Buttons = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;