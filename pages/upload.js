import WrapAuthPage from 'helpers/AuthWrapper';
import { useState } from 'react';
import styled from '@emotion/styled';
import Title from 'components/page/Title';
import BottomPopup from 'components/popup/BottomPopup';

const UploadPage = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleImageOnChange = (event) => {
    console.log('image onchange');
    event.preventDefault();
    const reader = new FileReader();
    const files = event.target.files;

    reader.onload = function (event) {
      // 썸네일 이미지 경로 설정
      setImageSrc(event.target.result);
    };

    if (files[0]) reader.readAsDataURL(files[0]);
  };

  const handleSubmitPhotoClick = () => {
    setShowPopup(true);
  };

  return (
    <Container>
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
      {imageSrc ? (
        <ButtonsWrapper>
          <SubmitButton onClick={handleSubmitPhotoClick}>다음</SubmitButton>
        </ButtonsWrapper>
      ) : (
        <ButtonsWrapper>
          <UploadButton htmlFor='upload-photo'>사진 업로드</UploadButton>
          <input
            type='file'
            id='upload-photo'
            accept='image/*'
            onChange={handleImageOnChange}
          />
        </ButtonsWrapper>
      )}

      <NicknamePopup visible={showPopup} setVisible={setShowPopup}>
        <span className='title'>영수증의 닉네임을 설정해주세요</span>
        <input type='text' placeholder='맥북 2022' className='text-input' />
        <SubmitButton>다음</SubmitButton>
      </NicknamePopup>
    </Container>
  );
};

// export default WrapAuthPage(UploadPage);
export default UploadPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  width: 100vw;
  height: 100vh;
  position: relative;
`;

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

  input {
    display: none;
  }
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

const SubmitButton = styled.button`
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

const NicknamePopup = styled(BottomPopup)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--grey200);

  .title {
    display: inline-block;
    width: 100%;
    font-size: 18px;
    text-align: center;
  }

  .text-input {
    margin-top: 24px;
    width: 100%;
    height: 60px;
    border: 1px solid var(--grey300);
    background: var(--grey100);
    border-radius: 8px;
    font-size: 18px;
    padding: 0 16px;
    font-weight: 300;
    color: var(--grey800);
  }
`;
