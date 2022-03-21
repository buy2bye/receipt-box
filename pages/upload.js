import WrapAuthPage from 'helpers/AuthWrapper';
import { useContext, useState } from 'react';
import styled from '@emotion/styled';
import receiptApi from 'api/receipt';
import Layout from 'components/layout/Layout';
import Button from 'components/button/Button';
import BottomTextInputPopup from 'components/popup/BottomTextInputPopup';
import { useRouter } from 'next/router';
import { ImageContext } from 'contexts/ImageContext';
import BottomPopupNotice from 'components/BottomPopupNotice';//호진 업로딩시 팝업
import ReactLoading from 'react-loading';

const UploadPage = () => {
  const { imageSrc, changeImageSrc, imageFile, changeImageFile } =
    useContext(ImageContext);
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);//호진 업로딩시 팝업

  const handleOnImageChange = (e) => {
    const reader = new FileReader();
    const files = e.target.files;

    reader.onload = function (e) {
      // 썸네일 이미지 경로 설정
      changeImageSrc(e.target.result);
    };

    if (files[0]) {
      reader.readAsDataURL(files[0]);
      changeImageFile(files[0]);
    }
  };

  const handleSubmitPhotoClick = () => {
    //이미지 등록 후 닉네임 설정 팝업 보여주기
    setShowPopup(true);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleUpload = async () => {
    setLoading(false); //호진 업로딩시 팝업
    //닉네임까지 입력 후 최종 영수증 업로드
    const { createReceipt } = receiptApi();
    createReceipt(nickname, imageFile)
      .then((res) => {
        setLoading(true); //호진 업로딩시 팝업
        alert('영수증이 등록되었습니다.');
        router.push('/');
      })
      .catch(({ response: res }) => {
        setLoading(false); //호진 업로딩시 팝업
        alert('영수증 등록에 실패했습니다.');
      });
  };

  return (
    <Layout hideBottom>
      <UploadNotice>
        <h2>잠깐!</h2>
        <h2>✔️ <span>물건 구입</span> 영수증을 촬영하셨나요?</h2>
        <h3>ㅤㅤ(또는 온라인 구매 내역 화면 캡쳐)<br></br>
        <br></br>
        ㅤㅤ물건 구입 영수증이 아닌<br></br>
        ㅤㅤ식당/카페 방문 영수증은 등록이 어려워요😭</h3>
      </UploadNotice>
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
            <UploadButton htmlFor='upload-photo'>다시 올리기</UploadButton>
          </Button>
          <Button
            primary
            onClick={handleSubmitPhotoClick}
            className='receipt-register'
          >
            등록하기
          </Button>
        </ButtonsWrapper>
      ) : (
        <ButtonsWrapper>
          <Button primary>
            <UploadButton primary htmlFor='upload-photo'>
              사진 올리기
            </UploadButton>
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
        confirmText='등록하기'
        buttonClass='receipt-register-confirm'
      />
      <BottomPopupNotice
        visible={loading}
        setVisible={setLoading}
        title={'등록 중 입니다😊'}
        height = '18vh'
        >
        <LoadingContainer>
          <ReactLoading
            type='spin'
            color='#AAAAAA'
            height='15%'
            width='15%'
          >
          </ReactLoading>
        </LoadingContainer>
          {/* <img src='/favicon.ico' alt='favicon' height='50px' width='50px'></img> */}
      </BottomPopupNotice>
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
  background: ${(props) =>
    props.primary ? 'var(--primary)' : 'var(--grey100)'};
  color: ${(props) => (props.primary ? 'var(--grey900)' : 'var(--grey700)')};
  width: 100%;
  height: 60px;
  font-size: 15px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadNotice = styled.div`
  margin: 0;
  width: 100%;
  h2 {
    margin: 0;
    width: 100%;
    font-size: 18px;
    font-weight: 800;
    color: black;
    span {
      background-color: var(--primary);
    }
  }

  h3 {
    margin: 0 0 10px 0;
    width: 100%;
    font-size: 14px;
    font-weight: 400;
    color: black;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 4vh;
  }
`;