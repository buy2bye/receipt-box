import styled from '@emotion/styled';
import receiptApi from 'api/receipt';
import Button from 'components/button/Button';
import FullScreenSpinner from 'components/common/FullScreenSpinner';
import Toggle from 'components/common/Toggle';
import Layout from 'components/layout/Layout';
import TextModal from 'components/modal/TextModal';
import BottomPopup from 'components/popup/BottomPopup';
import BottomTextInputPopup from 'components/popup/BottomTextInputPopup';
import DeleteReasons from 'components/receipt/DeleteReasons';
import UploadPreview from 'components/receipt/UploadPreview';
import WrapAuthPage from 'helpers/AuthWrapper';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { createPortal }  from 'react-dom';

const PopupInfo = {
  nickname: {
    title: '닉네임을 입력해주세요',
    placeholder: '예) 맥북 2022',
    confirmText: '변경하기',
    type: 'text',
  },
  productName: {
    title: '상품명을 입력해주세요',
    placeholder: 'iPhone 13 (핑크)',
    confirmText: '변경하기',
    type: 'text',
  },
  productPlace: {
    title: '구매처를 입력해주세요',
    placeholder: '애플스토어 가로수길',
    confirmText: '변경하기',
    type: 'text',
  },
  productPrice: {
    title: '구매가를 입력해주세요',
    placeholder: '1,090,000원 (숫자만 입력)',
    confirmText: '변경하기',
    type: 'number',
  },
  productDate: {
    title: '구매일자를 입력해주세요',
    placeholder: '2022-03-25',
    confirmText: '변경하기',
    type: 'date',
  },
};

const ReceiptDetail = ({
  receipt,
  isEdit,
  onEditClick,
  onSaveClick,
  onBackClick,
}) => {
  const router = useRouter();
  const { id } = router.query;

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

  const [newProductImage, setNewProductImage] = useState();
  const [newBackgroundImage, setNewBackgroundIamge] = useState();

  const [popupInfo, setPopupInfo] = useState();

  const [previewImage, setPreviewImage] = useState();
  const [previewByteImage, setPreviewByteImage] = useState();
  const [byteImageList, setByteImageList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [removeImageIndexList, setRemoveImageIndexList] = useState([]);

  const [deleteReasonsShown, setDeleteReasonsShown] = useState(false);
  const [receiptZoomedType, setReceiptZoomedType] = useState();
  const [receiptZoomedIn, setReceiptZoomedIn] = useState(false);
  const [receiptZoomedIndex, setReceiptZoomedIndex] = useState(0);
  const [receiptImageInfoShown, setReceiptImageInfoShown] = useState(false);
  const [usedDealInfoShown, setUsedDealInfoShown] = useState(false);
  const { deleteReceipt } = receiptApi();

  useEffect(() => {
    if (receipt) {
      setNewReceiptInfo(receipt);
    }
    setByteImageList([]);
    setImageList([]);
    setRemoveImageIndexList([]);
  }, [receipt, isEdit]);

  const handleUsedDealAlertToggle = (e) => {
    setNewReceiptInfo({ ...newReceiptInfo, usedDealAlert: newReceiptInfo });
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
      setNewReceiptInfo({
        ...newReceiptInfo,
        productImage: e.target.result
      });
    };

    if (files[0]) {
      reader.readAsDataURL(files[0]);
      setNewProductImage(files[0]);
    }
  };

  const handleBackgroundImageChange = (e) => {
    const reader = new FileReader();
    const files = e.target.files;

    reader.onload = function (e) {
      setNewReceiptInfo({
        ...newReceiptInfo,
        backgroundImage: e.target.result
      });
    };

    if (files[0]) {
      reader.readAsDataURL(files[0]);
      setNewBackgroundIamge(files[0]);
    }
  };

  const setPopupOpen = (varType) => {
    if (Object.keys(PopupInfo).includes(varType))
      setPopupInfo({
        title: PopupInfo[varType].title,
        placeholder: PopupInfo[varType].placeholder,
        onSubmit: (value) => {
          setNewReceiptInfo({ ...newReceiptInfo, [`${varType}`]: value });
          setPopupInfo(false);
        },
        confirmText: '변경하기',
        value: newReceiptInfo[`${varType}`],
        type: PopupInfo[varType].type,
      });
    else {
      setPopupInfo(false);
    }
  };

  const handleSaveClick = () => {
    if (!newReceiptInfo.productName) {
      alert('상품명을 입력해주세요.');
      return;
    }
    onSaveClick(
      newReceiptInfo,
      newProductImage,
      newBackgroundImage,
      imageList,
      removeImageIndexList
    );
  };

  const handleAddReceiptClick = (e) => {
    const reader = new FileReader();
    const files = e.target.files;

    reader.onload = function (e) {
      setPreviewByteImage(e.target.result)
    };

    if (files[0]) {
      reader.readAsDataURL(files[0]);
      setPreviewImage(files[0])
    }
  };

  const handleUploadClick = () => {
    setImageList(imageList.concat(previewImage));
    setByteImageList(byteImageList.concat(previewByteImage));

    setPreviewImage(null);
    setPreviewByteImage(null);
  };

  const handleReceiptImageDelete = () => {
    if (receiptZoomedType === 'byte') {
      const newByteImageList = byteImageList;
      const newImageList = imageList;

      newByteImageList.splice(receiptZoomedIndex, 1);
      newImageList.splice(receiptZoomedIndex, 1);
      setByteImageList(newByteImageList);
      setImageList(newImageList);
    } else {
      setRemoveImageIndexList(removeImageIndexList.concat(receiptZoomedIndex));
    }

    setReceiptZoomedIn(false);
  };

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
      {isEdit ? (
        <>
          <label htmlFor='upload-background'>
            <TopBackground src={newReceiptInfo?.backgroundImage || '/bg/receipt-background.png'} />
          </label>
          <input
            type='file'
            id='upload-background'
            accept='image/*'
            onChange={handleBackgroundImageChange}
          />
          <DeleteReceipt onClick={handleSaveClick}>저장하기</DeleteReceipt>
        </>
      ) : (
        <>
          <TopBackground src={newReceiptInfo?.backgroundImage || '/bg/receipt-background.png'} />
          <DeleteReceipt onClick={handleDeleteButtonClick}>
              삭제하기
          </DeleteReceipt>
          <ModifyReceipt onClick={onEditClick}>수정하기</ModifyReceipt>
        </>
      )}
      <DeleteReasons
        visible={deleteReasonsShown}
        setVisible={setDeleteReasonsShown}
        onDelete={handleDeleteSubmit}
      />
      <NicknameWrapper onClick={() => isEdit && setPopupOpen('nickname')}>
        {isEdit
          ? newReceiptInfo.nickname ||
            '소중한 내 물건에게 별명을 지어주세요 (선택)'
          : newReceiptInfo.nickname}
      </NicknameWrapper>

      {newReceiptInfo?.productImage ? (
        <ThumbnailWrapper>
          {isEdit ? (
            <>
              <label htmlFor='upload-photo'>
                <img src={newReceiptInfo.productImage} alt={newReceiptInfo.nickname} />
              </label>
              <input
                type='file'
                id='upload-photo'
                accept='image/*'
                onChange={handleProductImageChange}
              />
            </>
          ) : (
            <img src={newReceiptInfo.productImage} alt={newReceiptInfo.nickname} />
          )}
        </ThumbnailWrapper>
      ) : (
        <ThumbnailWrapper>
          <label htmlFor='upload-photo'>
            <img src='/icons/product-placeholder.png' alt='placeholder' />
            {isEdit && <span>내 물건의 프로필사진을 등록해보세요</span>}
          </label>
          {isEdit && (
            <input
              type='file'
              id='upload-photo'
              accept='image/*'
              onChange={handleProductImageChange}
            />
          )}
        </ThumbnailWrapper>
      )}

      <Details>
        <li onClick={() => isEdit && setPopupOpen('productName')}>
          <span>
            상품명
            {isEdit && (
              <span style={{ color: 'var(--primary)' }}> (필수) </span>
            )}
          </span>
          <span>
            {newReceiptInfo.productName ||
              (isEdit && '이곳을 터치해 입력하세요')}
          </span>
        </li>
        <li onClick={() => isEdit && setPopupOpen('productPlace')}>
          <span>
            구매처
            {isEdit && (
              <span style={{ color: 'var(--grey400)' }}> (선택) </span>
            )}
          </span>
          <span>
            {newReceiptInfo.productPlace ||
              (isEdit && '이곳을 터치해 입력하세요')}
          </span>
        </li>
        <li onClick={() => isEdit && setPopupOpen('productPrice')}>
          <span>
            구매가
            {isEdit && (
              <span style={{ color: 'var(--grey400)' }}> (선택) </span>
            )}
          </span>
          <span>
            {newReceiptInfo.productPrice
              ? `${parseInt(newReceiptInfo.productPrice).toLocaleString()}원`
              : isEdit && '이곳을 터치해 입력하세요'}
          </span>
        </li>
        <li onClick={() => isEdit && setPopupOpen('productDate')}>
          <span>
            구매일자
            {isEdit && (
              <span style={{ color: 'var(--grey400)' }}> (선택) </span>
            )}
          </span>
          <span>
            {newReceiptInfo.productDate ||
              (isEdit && '이곳을 터치해 입력하세요')}
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
            {receipt?.imageList.map((imageURL, idx) => {
              if (removeImageIndexList.includes(idx)) {
                return null;
              }
              return (
                <li key={`receipt__image__url__${idx}`}>
                  <img
                    src={imageURL}
                    alt={`image_${idx}`}
                    onClick={() => {
                      setReceiptZoomedIndex(idx);
                      setReceiptZoomedType('url');
                      setReceiptZoomedIn(true);
                    }}
                  />
                </li>
              );
            })}
            {byteImageList.map((image, idx) => (
              <li key={`receipt__image__${idx}`}>
                <img
                  src={image}
                  alt={imageList[idx].name}
                  onClick={() => {
                    setReceiptZoomedIndex(idx);
                    setReceiptZoomedType('byte');
                    setReceiptZoomedIn(true);
                  }}
                />
              </li>
            ))}
            {isEdit && (
              <>
                <AddReceiptImageLabel htmlFor='add-receipt-image'>
                  +
                </AddReceiptImageLabel>
                <input
                  type='file'
                  id='add-receipt-image'
                  accept='image/*'
                  onChange={handleAddReceiptClick}
                />
              </>
            )}
          </ReceiptImages>
        </AddReceiptList>

        {receipt?.linkList.length > 0 && (
          <ExternalLinkList>
            <span>내 물건 관리 tip</span>
            {receipt.linkList.map((link, index) => (
              <Link href={link.url} className='external-link' key={index}>
                {link.title}
              </Link>
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
            toggleState={newReceiptInfo.usedDealAlert}
            id='used-deal-switch'
          />
        </UsedDeal>
      </Details>
      {previewByteImage && createPortal(
        <UploadPreview
          imageSrc={previewByteImage}
          onBackClick={() => setPreviewByteImage(null)}
          onUploadClick={handleUploadClick}
        />, document.body
      )}
      <ZoomReceipt
        visible={receiptZoomedIn}
        setVisible={setReceiptZoomedIn}
        height='calc(100vw + 100px)'
      >
        <img
          src={
            receiptZoomedType === 'byte'
              ? byteImageList[receiptZoomedIndex]
              : receipt?.imageList[receiptZoomedIndex]
          }
          alt={receipt?.productName}
        />
        <div className='buttons__wrapper'>
          {isEdit && (
            <Button secondary onClick={handleReceiptImageDelete}>
              삭제하기
            </Button>
          )}
          <a
            href={
              receiptZoomedType === 'byte'
                ? byteImageList[receiptZoomedIndex]
                : receipt?.imageList[receiptZoomedIndex]
            }
            download
          >
            <Button primary>다운로드</Button>
          </a>
        </div>
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

const TopBackground = styled.img`
  position: absolute;
  object-fit: cover;
  top: 0px;
  left: 0;
  width: 100vw;
  height: 146px;
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
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
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
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
  z-index: 2;
`;

const NicknameWrapper = styled.div`
  height: 52px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  z-index: 1;

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

  label {
    width: 100%;
    height: 100%;
  }

  img {
    position: absolute;
    top: 0px;
    left: 0px;
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
  width: 75%;

  li {
    display: flex;
    width: 100%;

    > span:first-of-type {
      min-width: 92px;
      font-weight: 500;
      flex: 1;
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
  font-size: 24px;
`;
