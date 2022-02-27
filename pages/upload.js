import WrapAuthPage from 'helpers/AuthWrapper';
import { useState } from 'react';
import styled from '@emotion/styled';
import Title from 'components/page/Title';
import receiptApi from 'api/receipt';
import Layout from 'components/layout/Layout';
import Button from 'components/button/Button';
import BottomTextInputPopup from 'components/popup/BottomTextInputPopup';
import { useRouter } from 'next/router';

const UploadPage = () => {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState('');
  const [imageFile, setImageFile] = useState();
  const [nickname, setNickname] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleOnImageChange = (e) => {
    const reader = new FileReader();
    const files = e.target.files;
    setImageFile(files[0]);

    reader.onload = function (e) {
      // 썸네일 이미지 경로 설정
      setImageSrc(e.target.result);
    };

    if (files[0]) reader.readAsDataURL(files[0]);
  };

  const handleSubmitPhotoClick = () => {
    //이미지 등록 후 닉네임 설정 팝업 보여주기
    setShowPopup(true);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleUpload = () => {
    //닉네임까지 입력 후 최종 영수증 업로드
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
    <Layout hideBottom>
      <Title>영수증을 등록해 주세요</Title>
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
      <input
        type='file'
        id='upload-photo'
        accept='image/*'
        onChange={handleOnImageChange}
      />
      {imageSrc ? (
        <ButtonsWrapper>
          <Button>
            <label htmlFor='upload-photo'>다시 올리기</label>
          </Button>
          <Button primary onClick={handleSubmitPhotoClick}>
            다음
          </Button>
        </ButtonsWrapper>
      ) : (
        <ButtonsWrapper>
          <Button primary>
            <label htmlFor='upload-photo'>사진 올리기</label>
          </Button>
        </ButtonsWrapper>
      )}

      <BottomTextInputPopup
        visible={showPopup}
        setVisible={setShowPopup}
        title='영수증의 닉네임을 설정해주세요'
        placeholder='예) 맥북 2022'
        onInputChange={handleNicknameChange}
        onSubmit={handleUpload}
      />
    </Layout>
  );
};

export default WrapAuthPage(UploadPage);

const Thumbnail = styled.div`
  width: 100%;
  height: 360px;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;

  span {
    font-size: 14px;
    text-align: center;
    color: var(--grey300);
    line-height: 1.6;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  position: fixed;
  bottom: 24px;
  left: 24px;
  width: calc(100% - 48px);
`;

const UploadButton = styled.label`
  background: var(--blue500);
  color: white;
  width: 100%;
  height: 60px;
  font-size: 16px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
