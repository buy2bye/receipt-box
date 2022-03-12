import styled from '@emotion/styled';

import receiptApi from 'api/receipt';
import Button from 'components/button/Button';
import FullScreenSpinner from 'components/common/FullScreenSpinner';
import Toggle from 'components/common/Toggle';
import Layout from 'components/layout/Layout';
import Modal from 'components/modal/Modal';
import TextModal from 'components/modal/TextModal';
import BottomPopup from 'components/popup/BottomPopup';
import BottomTextInputPopup from 'components/popup/BottomTextInputPopup';
import DeleteReasons from 'components/receipt/DeleteReasons';
import apiController from 'helpers/apiController';
import WrapAuthPage from 'helpers/AuthWrapper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ReceiptDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [receipt, setReceipt] = useState();
  const [nickname, setNickname] = useState('');
  const [showNicknameChangePopup, setShowNicknameChangePopup] = useState(false);
  const [deleteReasonsShown, setDeleteReasonsShown] = useState(false);
  const [receiptZoomedIn, setReceiptZoomedIn] = useState(false);
  const [usedDealAlert, setUsedDealAlert] = useState(false);
  const [usedDealInfoShown, setUsedDealInfoShown] = useState(false);
  const {
    getReceiptDetail,
    changeReceiptNickname,
    updateProductImage,
    deleteReceipt,
  } = receiptApi();

  const fetchReceipt = async () => {
    const { data } = await getReceiptDetail(id);
    setReceipt(data);
    setUsedDealAlert(data.usedDealAlert);
  };

  useEffect(() => {
    fetchReceipt();
  }, []);

  const handleUsedDealAlertToggle = (e) => {
    setUsedDealAlert(e.target.checked);
    apiController().post(`/api/receipt/${id}/set-used-deal-alert`, {
      used_deal_alert: e.target.checked,
    });
  };

  const handleDeleteButtonClick = () => {
    setDeleteReasonsShown(true);
  };

  const handleDeleteSubmit = async (reason) => {
    await deleteReceipt(id, reason);
    router.replace('/');
  };

  const handleProductImageChange = (e) => {
    const reader = new FileReader();
    const files = e.target.files;

    reader.onload = function (e) {
      updateProductImage(id, files[0]).then(() => {
        fetchReceipt();
      });
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
    return (
      <Container hideBottom topNavColor='var(--grey100)'>
        <FullScreenSpinner />
      </Container>
    );
  }

  return (
    <Container hideBottom topNavColor='var(--grey100)'>
      <TopBackground />
      <DeleteReceipt onClick={handleDeleteButtonClick}>삭제하기</DeleteReceipt>
      <DeleteReasons
        visible={deleteReasonsShown}
        setVisible={setDeleteReasonsShown}
        onDelete={handleDeleteSubmit}
      />
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
          <span>상품 이미지를 준비해 드릴게요</span>
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
          <span>{receipt.productName || '업데이트 후 알림을 드릴게요'}</span>
        </li>
        <li>
          <span>구매처</span>
          <span>{receipt.productPlace || '업데이트 후 알림을 드릴게요'}</span>
        </li>
        <li>
          <span>구매가</span>
          <span>{receipt.productPrice || '업데이트 후 알림을 드릴게요'}</span>
        </li>
        <li>
          <span>구매일자</span>
          <span>{receipt.productDate || '업데이트 후 알림을 드릴게요'}</span>
        </li>
        <li>
          <span>영수증</span>
          <img
            src={receipt?.imageList[0]}
            alt={receipt?.productName}
            onClick={() => setReceiptZoomedIn(true)}
          />
        </li>
        {receipt.linkList.length > 0 && (
          <ExternalLinkList>
            <span>내 물건 관리 tip</span>
            {receipt.linkList.map((link, index) => (
              <a
                href={link.url}
                target='_blank'
                rel='noreferrer'
                className='external-link'
                key={index}
              >
                {link.title}
              </a>
            ))}
          </ExternalLinkList>
        )}
        <UsedDeal>
          <span>
            중고 거래 매칭 알림
            <button className='info' onClick={() => setUsedDealInfoShown(true)}>
              ?
            </button>
          </span>
          <Toggle
            onToggle={handleUsedDealAlertToggle}
            toggleState={usedDealAlert}
            id='used-deal-switch'
          />
        </UsedDeal>
      </Details>

      <ZoomReceipt
        visible={receiptZoomedIn}
        setVisible={setReceiptZoomedIn}
        height='calc(100vw + 100px)'
      >
        <img src={receipt.imageList[0]} alt={receipt.productName} />
        <a href={receipt.imageList[0]} download>
          <Button primary>다운로드</Button>
        </a>
      </ZoomReceipt>

      <BottomTextInputPopup
        visible={showNicknameChangePopup}
        setVisible={setShowNicknameChangePopup}
        title='변경할 닉네임을 입력해주세요'
        placeholder='예) 맥북 2022'
        onInputChange={handleNicknameChange}
        onSubmit={handleNicknameSubmit}
        confirmText='변경하기'
      />

      <TextModal
        isOpen={usedDealInfoShown}
        onCloseClick={() => setUsedDealInfoShown(false)}
      >
        ‘중고 거래 매칭 알림’ 을 켜두면
        <br /> 중고 구매를 희망하는 분이 나타났을 때 바이투바이가 알려드려요 🙂{' '}
        <br />
        <br /> 중고 판매를 원치 않으시면 꺼두시면 됩니다.
      </TextModal>
    </Container>
  );
};

export default WrapAuthPage(ReceiptDetail);

const Container = styled(Layout)``;

const TopBackground = styled.div`
  position: absolute;
  top: 0px;
  left: 0;
  width: 100vw;
  height: 146px;
  background: var(--grey100);
  z-index: 0;
  border-bottom: 1px solid var(--grey300);
`;

const DeleteReceipt = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  height: 32px;
  background: transparent;
  padding: 8px;
  color: var(--grey500);
  font-size: 13px;
  z-index: 2;
`;

const NicknameWrapper = styled.div`
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1;

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
  width: 140px;
  min-height: 140px;
  height: 140px;
  background: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  position: relative;
  border: 1px solid var(--grey300);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  span {
    padding: 20px;
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
  gap: 20px;
  padding: 16px 0;
  margin-top: 24px;
  font-size: 14px;
  font-weight: 300;

  li {
    display: flex;
    width: 100%;

    > span:first-of-type {
      min-width: 80px;
      font-weight: 500;
    }

    img {
      width: 60px;
      height: 60px;
      border: 1px solid var(--grey300);
    }
  }
`;

const ZoomReceipt = styled(BottomPopup)`
  img {
    width: calc(100vw - 48px);
    height: calc(100vw - 48px);
    object-fit: contain;
  }
`;

const ExternalLinkList = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    padding-bottom: 8px;
  }

  a {
    background: var(--grey100);
    color: var(--grey900);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 270px;
    padding: 12px;
    font-weight: 300;
    font-size: 14px;
    border-radius: 8px;
  }
`;

const UsedDeal = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: flex;
    align-items: center;
  }

  .info {
    padding: 0;
    width: 14px;
    height: 14px;
    font-size: 10px;
    margin-left: 6px;
    border: 1px solid var(--grey600);
    border-radius: 50%;
    color: var(--grey600);
    margin-right: 16px;
  }
`;

const UsedDealInfo = styled.div`
  width: calc(100% - 40px);
  height: auto;
  padding: 20px;
`;
