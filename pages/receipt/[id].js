import styled from '@emotion/styled';
import receiptApi from 'api/receipt';
import Button from 'components/button/Button';
import Layout from 'components/layout/Layout';
import TextModal from 'components/modal/TextModal';
import BottomPopup from 'components/popup/BottomPopup';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ReceiptDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [receipt, setReceipt] = useState();
  const [productImage, setProductImage] = useState('');
  const [imageFile, setImageFile] = useState();
  const [nickname, setNickname] = useState('');
  const [showNicknameChangePopup, setShowNicknameChangePopup] = useState(false);
  const { getReceiptDetail, changeReceiptNickname } = receiptApi();

  useEffect(() => {
    getReceiptDetail(id).then((data) => setReceipt(data.data));
  }, []);

  const handleOnImageChange = (event) => {
    const reader = new FileReader();
    const files = event.target.files;
    setImageFile(files[0]);

    reader.onload = function (event) {
      // 썸네일 이미지 경로 설정
      setProductImage(event.target.result);
    };

    if (files[0]) reader.readAsDataURL(files[0]);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleNicknameSubmit = () => {
    changeReceiptNickname(id, nickname).then(() => {
      getReceiptDetail(id).then((data) => setReceipt(data.data));
      setShowNicknameChangePopup(false);
    });
  };

  if (!receipt) {
    return <Container>loading</Container>;
  }

  return (
    <Container>
      <NicknameWrapper>
        <span>{receipt.nickname}</span>
        <button onClick={() => setShowNicknameChangePopup(true)}>
          <img src='/icons/edit (2).png' alt='edit' />
        </button>
      </NicknameWrapper>

      <FileInput
        type='file'
        id='upload-photo'
        accept='image/*'
        onChange={handleOnImageChange}
      />

      {receipt.productImage ? (
        <ThumbnailWrapper>
          <img src={receipt.productImage} alt={receipt.nickname} />
          <button onClick={() => alert('닉네임 변경할 것')}>
            <img src='/icons/edit (2).png' alt='edit' />
          </button>
        </ThumbnailWrapper>
      ) : productImage ? (
        <ThumbnailWrapper>
          <img src={productImage} alt={receipt.productName} />
        </ThumbnailWrapper>
      ) : (
        <ThumbnailWrapper>
          <span>이미지를 준비해 드릴게요</span>
          <label htmlFor='upload-photo'>직접 등록하기</label>
        </ThumbnailWrapper>
      )}

      <Details>
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
      </Details>

      <BottomPopup
        visible={showNicknameChangePopup}
        setVisible={setShowNicknameChangePopup}
        title='변경할 닉네임을 입력해주세요'
      >
        <TextInput
          type='text'
          placeholder='예) 맥북 2022'
          onChange={handleNicknameChange}
        />
        <Button primary onClick={handleNicknameSubmit}>
          다음
        </Button>
      </BottomPopup>
    </Container>
  );
};

export default ReceiptDetail;

const Container = styled(Layout)``;

const NicknameWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 14px;
    height: 14px;
    opacity: 0.8;
  }

  button {
    padding: 0;
    background: none;
  }
`;

const ThumbnailWrapper = styled.div`
  width: 160px;
  min-height: 160px;
  background: var(--grey100);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  position: relative;

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
    flex: 1;
    display: flex;
    align-items: center;
  }

  label {
    font-weight: 500;
    font-size: 12px;
    text-decoration: underline;
    text-underline-position: under;
    color: var(--grey800);
    padding-bottom: 16px;
  }

  button {
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 24px;
    height: 24px;
    background: rgba(255, 255, 255, 0.6);
    padding: 4px;
    border-radius: 4px;

    img {
      border-radius: 0;
    }
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Details = styled.ul`
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
`;

const TextInput = styled.input`
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
`;
