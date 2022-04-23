import styled from '@emotion/styled';

import Button from 'components/button/Button';
import FullScreenSpinner from 'components/common/FullScreenSpinner';
import Toggle from 'components/common/Toggle';
import Layout from 'components/layout/Layout';
import TextModal from 'components/modal/TextModal';
import BottomPopup from 'components/popup/BottomPopup';
import BottomTextInputPopup from 'components/popup/BottomTextInputPopup';
import DeleteReasons from 'components/receipt/DeleteReasons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { receiptList } from 'data/previewData';
import PreviewModal from 'components/preview/PreviewModal';

const receiptPreview = {
  id: 1,
  nickname: '나의 첫 애플워치',
  productDate: '2022-03-10',
  productImage: '/preview/preview-applewatch.png',
  productName: 'Apple Watch Nike SE',
  productPlace: '더현대서울 이샵',
  productPrice: 359000,
  imageList: ['/preview/preview-receipt.jpeg'],
  linkList: [],
  backgroundImage: '/preview/preview-background.jpg',
};

const ReceiptDetail = () => {
  const router = useRouter();
  const receipt = receiptPreview;
  const [nickname, setNickname] = useState('');
  const [showNicknameChangePopup, setShowNicknameChangePopup] = useState(false);
  const [deleteReasonsShown, setDeleteReasonsShown] = useState(false);
  const [receiptZoomedIn, setReceiptZoomedIn] = useState(false);
  const [usedDealAlert, setUsedDealAlert] = useState(false);
  const [usedDealInfoShown, setUsedDealInfoShown] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewModalText, setPreviewModalText] = useState('');

  const handleDeleteButtonClick = () => {
    setDeleteReasonsShown(true);
  };

  const handleUsedDealAlertToggle = (e) => {
    setUsedDealAlert(e.target.checked);
  };

  const handleProductImageChange = (e) => {
    setPreviewModalText('이미지 변경을 위해서는 로그인이 필요합니다.');
    setIsPreviewModalOpen(true);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleNicknameSubmit = () => {
    setPreviewModalText('닉네임 변경을 위해서는 로그인이 필요합니다.');
    setIsPreviewModalOpen(true);
  };

  const handleDeleteSubmit = () => {
    setPreviewModalText('영수증 삭제를 위해서는 로그인이 필요합니다.');
    setIsPreviewModalOpen(true);
  };

  return (
    <Container hideBottom topNavInBody topNavColor='transparent'>
      <TopBackground src={receipt.backgroundImage} />
      <ThumbnailWrapper>
        <img src={receipt.productImage} alt={receipt.nickname} />
      </ThumbnailWrapper>
      <NicknameWrapper>
        <span>
          {receipt.nickname}{' '}
          <span style={{ color: 'var(--primary)' }}> (예시) </span>
        </span>
      </NicknameWrapper>
      <Details>
        <li>
          <span>상품명</span>
          <span>{receipt.productName}</span>
        </li>
        <li>
          <span>구매처</span>
          <span>{receipt.productPlace}</span>
        </li>
        <li>
          <span>구매가</span>
          <span>{parseInt(receipt.productPrice).toLocaleString()}원</span>
        </li>
        <li>
          <span>구매일자</span>
          <span>{receipt.productDate}</span>
        </li>
        <AddReceiptList>
          <span>영수증/품질보증서 보관함</span>
          <li>
            <img src={receiptPreview.imageList[0]} alt='preview-receipt' />
          </li>
        </AddReceiptList>
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
            toggleState={true}
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
      <PreviewModal
        text={previewModalText}
        isOpen={isPreviewModalOpen}
        setIsOpen={setIsPreviewModalOpen}
      />
    </Container>
  );
};

export default ReceiptDetail;

const Container = styled(Layout)`
  overflow-x: hidden;
`;

const TopBackground = styled.img`
  position: absolute;
  object-fit: cover;
  top: 0px;
  left: 0;
  width: 100vw;
  height: 310px;
  z-index: 0;
  filter: brightness(0.7);
  border-bottom: 1px solid var(--grey300);
`;

const NicknameWrapper = styled.div`
  margin: 20px 0 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1;
  font-weight: bold;
  font-size: 20px;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;

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
  margin-top: 190px;

  label {
    width: 100%;
    height: 100%;
  }

  img {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  span {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 20px;
    word-break: keep-all;
    color: var(--grey500);
    font-size: 13px;
    flex: 1;
    display: flex;
    align-items: center;
    z-index: 1;
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
  width: 71%;

  li {
    display: flex;
    align-items: normal;
    width: 100%;
    overflow: hidden;

    > span:first-of-type {
      min-width: 92px;
      font-weight: 500;
      flex: 1;
    }

    > span:last-of-type {
      text-align: right;
    }

    img {
      width: 60px;
      height: 60px;
      border: 1px solid var(--grey300);
    }

    span > img {
      width: 14px;
      height: 14px;
      border: none;
      margin-left: 8px;
    }
  }
`;

const ZoomReceipt = styled(BottomPopup)`
  img {
    width: calc(100vw - 48px);
    height: calc(100vw - 48px);
    object-fit: contain;
  }

  .buttons__wrapper {
    display: flex;
    gap: 8px;
    a,
    button {
      flex: 1;
    }
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

const AddReceiptList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;

  span {
    display: flex;
    align-items: center;
    font-weight: 500;
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

const ReceiptImages = styled.ul`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  li {
    width: 60px;
    height: 60px;
    border: 1px solid var(--grey500);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const AddReceiptImageLabel = styled.label`
  width: 60px;
  height: 60px;
  border: 1px solid var(--grey500);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
