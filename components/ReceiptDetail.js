import styled from '@emotion/styled';
import { stepIconClasses } from '@mui/material';
import receiptApi from 'api/receipt';
import Button from 'components/button/Button';
import FullScreenSpinner from 'components/common/FullScreenSpinner';
import Toggle from 'components/common/Toggle';
import Layout from 'components/layout/Layout';
import TextModal from 'components/modal/TextModal';
import BottomPopup from 'components/popup/BottomPopup';
import BottomTextInputPopup from 'components/popup/BottomTextInputPopup';
import DeleteReasons from 'components/receipt/DeleteReasons';
import apiController from 'helpers/apiController';
import WrapAuthPage from 'helpers/AuthWrapper';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ReceiptDetail = ({
  receipt,
  isEdit,
  onEditClick,
  onSaveClick,
  onBackClick
}) => {
  const router = useRouter();
  const { id } = router.query;

  const [nickname, setNickname] = useState();
  const [productName, setProductName] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productPlace, setProductPlace] = useState();
  const [productDate, setProductDate] = useState();
  const [usedDealAlert, setUsedDealAlert] = useState(false);

  const [popupInfo, setPopupInfo] = useState()

  const [deleteReasonsShown, setDeleteReasonsShown] = useState(false);
  const [receiptZoomedIn, setReceiptZoomedIn] = useState(false);
  const [receiptZoomedIndex, setReceiptZoomedIndex] = useState(0)
  const [receiptImageInfoShown, setReceiptImageInfoShown] = useState(false);
  const [usedDealInfoShown, setUsedDealInfoShown] = useState(false);

  useEffect(() => {
    if (receipt) {
      setNickname(receipt.nickname);
      setProductName(receipt.productName);
      setProductPrice(receipt.productPrice);
      setProductPlace(receipt.productPlace);
      setProductDate(receipt.productDate);
      setUsedDealAlert(receipt.usedDealAlert);
    }
  }, [receipt, isEdit])

  const {
    updateProductImage,
    deleteReceipt,
  } = receiptApi();

  const handleUsedDealAlertToggle = (e) => {
    setUsedDealAlert(e.target.checked);
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

  const setPopupOpen = (varType) => {
    if (varType === 'nickname') {
      setPopupInfo({
        title: '닉네임을 입력해주세요',
        placeholder: '예) 맥북 2022',
        onSubmit: (value) => {
          setNickname(value);
          setPopupInfo(false);
        },
        confirmText: '변경하기',
        value: nickname
      });
    } else if (varType === 'productName') {
      setPopupInfo({
        title: '상품명을 입력해주세요',
        placeholder: 'iPhone 13 (핑크)',
        onSubmit: (value) => {
          setProductName(value);
          setPopupInfo(false);
        },
        confirmText: '변경하기',
        value: productName
      });
    } else if (varType === 'productPlace') {
      setPopupInfo({
        title: '구매처를 입력해주세요',
        placeholder: '애플스토어 가로수길',
        onSubmit: (value) => {
          setProductPlace(value);
          setPopupInfo(false);
        },
        confirmText: '변경하기',
        value: productPlace
      });
    } else if (varType === 'productPrice') {
      setPopupInfo({
        title: '구매가를 입력해주세요',
        placeholder: '1090000',
        onSubmit: (value) => {
          setProductPrice(value);
          setPopupInfo(false);
        },
        confirmText: '변경하기',
        value: productPlace,
        type: 'number'
      });
    } else if (varType === 'productDate') {
      setPopupInfo({
        title: '구매일자를 입력해주세요',
        placeholder: '2022-03-25',
        onSubmit: (value) => {
          setProductDate(value);
          setPopupInfo(false);
        },
        confirmText: '변경하기',
        value: productDate,
        type: 'date'
      });
    } else {
      setPopupInfo(false);
    }
  }

  const handleSaveClick = () => {
    onSaveClick(
      nickname,
      productName,
      productPlace,
      productPrice,
      productDate,
      usedDealAlert
    )
  }

  if (!receipt && !isEdit) {
    return (
      <Container hideBottom topNavColor='var(--grey100)'>
        <FullScreenSpinner />
      </Container>
    );
  } 

  return (
    <Container
      hideBottom
      topNavColor='var(--grey100)'
      onBackClick={onBackClick}
    >
      <TopBackground
        backgroundImage={receipt.backgroundImage}
      />
      {isEdit ? (
        <DeleteReceipt onClick={handleSaveClick}>저장하기</DeleteReceipt>
      ) : (
        <>
          <DeleteReceipt onClick={handleDeleteButtonClick}>삭제하기</DeleteReceipt>
          <ModifyReceipt onClick={onEditClick}>수정하기</ModifyReceipt>
        </>
      )}
  
      <DeleteReasons
        visible={deleteReasonsShown}
        setVisible={setDeleteReasonsShown}
        onDelete={handleDeleteSubmit}
      />
      <NicknameWrapper
        onClick={() => isEdit && setPopupOpen('nickname')}>
        {isEdit ?
        (nickname || '소중한 내 물건에게 별명을 지어주세요 (선택)') :
        nickname}
      </NicknameWrapper>

      {receipt?.productImage ? (
        <ThumbnailWrapper>
          <img src={receipt.productImage} alt={nickname} />
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
          {isEdit && (
            <label className='new-image' htmlFor='upload-photo'>
              직접 등록하기
            </label>
          )}
        </ThumbnailWrapper>
      )}

      <Details>
        <li
          onClick={() => isEdit && setPopupOpen('productName')}
        >
          <span>
            상품명
            {isEdit && (
              <span style={{color: 'var(--primary)'}}> (필수) </span>
            )}
          </span>
          <span>
            {productName}
          </span>
        </li>
        <li
          onClick={() => isEdit && setPopupOpen('productPlace')}
        >
          <span>
            구매처
            {isEdit && (
              <span style={{color: 'var(--grey400)'}}> (선택) </span>
            )}
          </span>
          <span>
            {productPlace}
          </span>
        </li>
        <li
          onClick={() => isEdit && setPopupOpen('productPrice')}
        >
          <span>
            구매가
            {isEdit && (
              <span style={{color: 'var(--grey400)'}}> (선택) </span>
            )}
          </span>
          <span>
            {productPrice}
          </span>
        </li>
        <li
          onClick={() => isEdit && setPopupOpen('productDate')}
        >
          <span>
            구매일자
            {isEdit && (
              <span style={{color: 'var(--grey400)'}}> (선택) </span>
            )}
          </span>
          <span>
            {productDate}
          </span>
        </li>
        <UsedDeal>
          <span>
            영수증/품질보증서 보관함
            <button className='info' onClick={() => setReceiptImageInfoShown(true)}>
              ?
            </button>
          </span>
        </UsedDeal>
        <li>
          {_.map(receipt?.imageList, (image, idx) => {
            return <img
              key={`receipt__image__${idx}`}
              src={image}
              alt={receipt?.productName}
              onClick={() => {
                setReceiptZoomedIndex(idx)
                setReceiptZoomedIn(true)
              }}
            />
          })}
        </li>
        {receipt?.linkList.length > 0 && (
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
            onToggle={isEdit ? handleUsedDealAlertToggle : null}
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
        <img src={receipt?.imageList[receiptZoomedIndex]} alt={receipt?.productName} />
        <a href={receipt?.imageList[receiptZoomedIndex]} download>
          <Button primary>다운로드</Button>
        </a>
      </ZoomReceipt>

      <BottomTextInputPopup
        visible={popupInfo}
        setVisible={setPopupOpen}
        {...popupInfo}  
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
      <TextModal
        isOpen={receiptImageInfoShown}
        onCloseClick={() => setReceiptImageInfoShown(false)}
      >
        매번 찾아 헤맬 일 없도록 관련 서류를 보관하세요 😃
        <br />
        (예: 구매 영수증, 품질보증서, 구매 내역 캡쳐 등)
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
  z-index: 0;
  border-bottom: 1px solid var(--grey300);

  background: ${props =>
    props.backgroundImage ?
    `url(${props.backgroundImage})` :
    'url(/bg/receipt-background.png)'
  };
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

const ModifyReceipt = styled.button`
  position: fixed;
  top: 10px;
  right: 72px;
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
  width: 70%;

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
