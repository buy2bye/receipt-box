import styled from '@emotion/styled';
import receiptApi from 'api/receipt';
import Button from 'components/button/Button';
import Layout from 'components/layout/Layout';
import TextModal from 'components/modal/TextModal';
import BottomPopup from 'components/popup/BottomPopup';
import BottomTextInputPopup from 'components/popup/BottomTextInputPopup';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const ReceiptDetail = () => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const router = useRouter();
  const { id } = router.query;
  const [receipt, setReceipt] = useState();
  const [nickname, setNickname] = useState('');
  const [showNicknameChangePopup, setShowNicknameChangePopup] = useState(false);
  const { getReceiptDetail, changeReceiptNickname, updateProductImage } =
    receiptApi();

  useEffect(() => {
    getReceiptDetail(id).then((data) => setReceipt(data.data));
  }, []);

  const handleProductImageChange = (e) => {
    const reader = new FileReader();
    const files = e.target.files;

    reader.onload = function (e) {
      updateProductImage(id, files[0]).then(() => {
        // 새로운 이미지 보이도록 처리해야함
        // forceUpdate();
        // router.replace(`/receipt/${id}`);
      });
    };

    if (files[0]) reader.readAsDataURL(files[0]);
  };

  console.log('rendered');

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
          <img src='/icons/edit.png' alt='edit' />
        </button>
      </NicknameWrapper>

      {receipt.productImage ? (
        <ThumbnailWrapper>
          <img src={receipt.productImage} alt={receipt.nickname} />
          <input
            type='file'
            id='upload-photo'
            accept='image/*'
            onChange={handleProductImageChange}
          />
          <label className='change-image' htmlFor='upload-photo'>
            <img src='/icons/edit.png' alt='edit' />
          </label>
        </ThumbnailWrapper>
      ) : (
        <ThumbnailWrapper>
          <span>이미지를 준비해 드릴게요</span>
          <input
            type='file'
            id='upload-photo'
            accept='image/*'
            onChange={handleProductImageChange}
          />
          <label className='new-image' htmlFor='upload-photo'>
            직접 등록하기
          </label>
        </ThumbnailWrapper>
      )}

      <Details>
        <li>
          <span>상품명</span>
          <span>{receipt.productName || '곧 업데이트 해드릴게요'}</span>
        </li>
        <li>
          <span>구매처</span>
          <span>{receipt.productPlace || '곧 업데이트 해드릴게요'}</span>
        </li>
        <li>
          <span>구매가</span>
          <span>
            {receipt.productPrice
              ? `${parseInt(receipt.productPrice).toLocaleString()} 원`
              : '곧 업데이트 해드릴게요'}
          </span>
        </li>
        <li>
          <span>구매일자</span>
          <span>{receipt.productDate || '곧 업데이트 해드릴게요'}</span>
        </li>
        <li>
          <span>영수증</span>
          <img src={receipt?.imageList[0]} alt={receipt?.productName} />
        </li>
      </Details>

      <BottomTextInputPopup
        visible={showNicknameChangePopup}
        setVisible={setShowNicknameChangePopup}
        title='변경할 닉네임을 입력해주세요'
        placeholder='예) 맥북 2022'
        onInputChange={handleNicknameChange}
        onSubmit={handleNicknameSubmit}
      />
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

  .new-image {
    font-weight: 500;
    font-size: 12px;
    text-decoration: underline;
    text-underline-position: under;
    color: var(--grey800);
    padding-bottom: 16px;
  }

  .change-image {
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

const Details = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;
  margin-top: 24px;
  font-size: 14px;
  font-weight: 300;

  li > span:first-of-type {
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
