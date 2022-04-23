import styled from '@emotion/styled';
import Toggle from 'components/common/Toggle';
import Layout from 'components/layout/Layout';
import TextModal from 'components/modal/TextModal';
import React, { useState } from 'react';
import LoginModal from './login/LoginModal';

const ReceiptDetailPreview = () => {
  const [newReceiptInfo, setNewReceiptInfo] = useState({
    nickname: '',
    productImage: '',
    backgroundImage: '',
    productName: '',
    productPrice: '',
    productPlace: '',
    productDate: '',
    imageList: [],
    usedDealAlert: false,
  });
  const [receiptImageInfoShown, setReceiptImageInfoShown] = useState(false);
  const [usedDealInfoShown, setUsedDealInfoShown] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleUsedDealAlertToggle = (e) => {
    setNewReceiptInfo({ ...newReceiptInfo, usedDealAlert: e.target.checked });
  };

  const handleEditClick = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <Container hideBottom topNavColor='transparent' topNavInBody>
      <TopBackground
        src={
          newReceiptInfo?.backgroundImage || '/bg/receipt-background-create.png'
        }
        onClick={handleEditClick}
      />

      <DeleteReceipt onClick={handleEditClick}>저장</DeleteReceipt>
      <EditIcon
        top={280}
        right={10}
        src='/icons/edit.png'
        alt='edit-icon'
        width={18}
        height={18}
        onClick={handleEditClick}
      />

      <ThumbnailWrapper onClick={handleEditClick}>
        <img src='/icons/product-placeholder.png' alt='placeholder' />
        <span>내 물건의 프로필사진을 등록해보세요</span>
      </ThumbnailWrapper>

      <NicknameWrapper onClick={handleEditClick}>
        내 물건에게 별명을 지어주세요
        <img src='/icons/edit.png' alt='edit-icon' />
      </NicknameWrapper>

      <Details>
        <li onClick={handleEditClick}>
          <span>
            상품명
            <span style={{ color: 'var(--primary)' }}> (필수) </span>
          </span>
          <span>
            터치하여 입력하세요
            <img src='/icons/edit.png' alt='edit-icon' />
          </span>
        </li>
        <li onClick={handleEditClick}>
          <span>
            구매처
            <span style={{ color: 'var(--grey400)' }}> (선택) </span>
          </span>
          <span>
            터치하여 입력하세요
            <img src='/icons/edit.png' alt='edit-icon' />
          </span>
        </li>
        <li onClick={handleEditClick}>
          <span>
            구매가
            <span style={{ color: 'var(--grey400)' }}> (선택) </span>
          </span>
          <span>
            터치하여 입력하세요
            <img src='/icons/edit.png' alt='edit-icon' />
          </span>
        </li>
        <li onClick={handleEditClick}>
          <span>
            구매일자
            <span style={{ color: 'var(--grey400)' }}> (선택) </span>
          </span>
          <span>
            터치하여 입력하세요
            <img src='/icons/edit.png' alt='edit-icon' />
          </span>
        </li>
        <AddReceiptList>
          <span>
            영수증/품질보증서 보관함
            <button
              className='info'
              onClick={() => setReceiptImageInfoShown(true)}
            >
              ?
            </button>
          </span>
          <ReceiptImages>
            <AddReceiptImageLabel onClick={handleEditClick}>
              +
            </AddReceiptImageLabel>
          </ReceiptImages>
        </AddReceiptList>
        <UsedDeal>
          <span>
            중고 거래 매칭 알림
            <button className='info' onClick={() => setUsedDealInfoShown(true)}>
              ?
            </button>
          </span>
          <Toggle
            onToggle={handleUsedDealAlertToggle}
            toggleState={newReceiptInfo.usedDealAlert}
            id='used-deal-switch'
          />
        </UsedDeal>
      </Details>

      <TextModal
        isOpen={usedDealInfoShown}
        onCloseClick={() => setUsedDealInfoShown(false)}
      >
        ‘중고 거래 매칭 알림’ 을 켜두면
        <br /> 중고 구매를 희망하는 분이 나타났을 때 바이투바이가 알려드려요 🙂{' '}
        <br />
        <br /> 중고 판매를 원치 않으시면 꺼두시면 됩니다.
      </TextModal>
      <TextModal
        isOpen={receiptImageInfoShown}
        onCloseClick={() => setReceiptImageInfoShown(false)}
      >
        매번 찾아 헤맬 일 없도록 관련 서류를 보관하세요 😃
        <br />
        (예: 구매 영수증, 품질보증서, 구매 내역 캡쳐 등)
      </TextModal>
      <LoginModal
        isOpen={isLoginModalOpen}
        onCloseClick={() => setIsLoginModalOpen(false)}
      />
    </Container>
  );
};

export default ReceiptDetailPreview;

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

const DeleteReceipt = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 32px;
  background: transparent;
  padding: 8px;
  font-size: 13px;
  color: var(--grey300);
  z-index: 2;
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

const EditIcon = styled.img`
  position: absolute;
  top: ${({ top }) => `${top}px` || 0} !important;
  bottom: ${({ bottom }) => `${bottom}px` || 0} !important;
  left: ${({ left }) => `${left}px` || 0} !important;
  right: ${({ right }) => `${right}px` || 0} !important;
  width: ${({ width }) => `${width}px`} !important;
  height: ${({ height }) => `${height}px`} !important;
  z-index: 99;
  border-radius: 2px !important;
  background: rgba(255, 255, 255, 0);
  padding: 2px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 4vh;
  }
`;
