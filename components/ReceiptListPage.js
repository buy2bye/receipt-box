import styled from '@emotion/styled';
import Title from 'components/page/Title';
import Layout from 'components/layout/Layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import receiptApi from 'api/receipt';
import FileInputLabel from './common/FileInputLabel';
import userApi from 'api/user';
import BottomTextInputPopup from './popup/BottomTextInputPopup';
import ReceiptsListView from './receipt/ReceiptsListView';
import ReceiptsGridView from './receipt/ReceiptsGridView';
import SummaryPopup from './receipt/SummaryPopup';
import HeaderTextModal from './modal/HeaderTextModal';
import BadgeModal from './modal/BadgeModal';
import { css } from '@emotion/react';
import SelectBox from './common/SelectBox';
import CollectionList from './receipt/collection/CollectionList';
import Modal from './modal/Modal';
import Button from 'components/button/Button';
import DeleteReasons from 'components/receipt/DeleteReasons';

const ReceiptListPage = ({ userInfo }) => {
  const router = useRouter();
  const [receiptList, setReceiptList] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [priceSumList, setPriceSumList] = useState([]);
  const [isTotalPriceModalShown, setIsTotalPriceModalShown] = useState(false);
  const [selectedListType, setSelectedListType] = useState('grid');
  const [summaryItem, setSummaryItem] = useState();
  const [summaryPosition, setSummaryPosition] = useState({});
  const [isBadgeModalShown, setIsBadgeModalShown] = useState(false);
  const [isCollectionListOpen, setIsCollectionListOpen] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState();
  const { updateProfileImage } = userApi();
  const [collections, setCollections] = useState();
  const [isCreateCollectionPopupOpen, setIsCreateCollectionPopupOpen] =
    useState(false);
  const [isCollectionEditSelectorOpen, setIsCollectionEditSelectorOpen] =
    useState(false);
  const [isChangeCollectionNamePopupOpen, setIsChangeCollectionNamePopupOpen] =
    useState(false);
  const [collectionEditSelectorOption, setCollectionEditSelectorOption] =
    useState();
  const [isDeletePopupShown, setIsDeletePopupShown] = useState(false);
  const [orderType, setOrderType] = useState('구매일자순');

  const {
    getReceipts,
    getCategories,
    getReceiptPriceSum,
    createCategories,
    deleteCategories,
    changeCategoryName
  } =
    receiptApi();

  const badgeImage =
    totalCount > 200
      ? '/icons/badge/badge-201.png'
      : totalCount > 140
      ? '/icons/badge/badge-141.png'
      : totalCount > 100
      ? '/icons/badge/badge-101.png'
      : totalCount > 70
      ? '/icons/badge/badge-71.png'
      : totalCount > 50
      ? '/icons/badge/badge-51.png'
      : totalCount > 40
      ? '/icons/badge/badge-41.png'
      : totalCount > 30
      ? '/icons/badge/badge-31.png'
      : totalCount > 20
      ? '/icons/badge/badge-21.png'
      : totalCount > 10
      ? '/icons/badge/badge-11.png'
      : totalCount > 1
      ? '/icons/badge/badge-1.png'
      : '/icons/badge/badge-0.png';

  useEffect(() => {
    const savedId = Number(window.localStorage.getItem('selectedCollectionId'))
    getCategories().then((data) => {
      setCollections(data.data.categoryList);
      const hasSaved = data.data.categoryList.filter(item => item.id === savedId).length > 0
      setSelectedCollectionId(hasSaved ? savedId : data.data.categoryList[0].id);
    });
    setOrderType(window.localStorage.getItem('orderType') || '구매일자순');
  }, []);

  const orderMap = {
    구매일자순: {
      orderCol: 'product_date',
      orderDesc: true,
    },
    상품명순: {
      orderCol: 'product_name',
      orderDesc: false,
    },
    구매가순: {
      orderCol: 'product_price',
      orderDesc: true,
    },
    등록순: {
      orderCol: 'created_time',
      orderDesc: true,
    },
    별명순: {
      orderCol: 'nickname',
      orderDesc: false,
    },
  };

  useEffect(() => {
    getReceipts(1, 0).then((data) => {
      setTotalCount(data.data.totalCount);
    });

    getReceiptPriceSum().then((data) => {
      setPriceSumList(data.data.priceList);
    });
  }, []);

  useEffect(() => {
    const orderParams = orderMap[orderType];
    getReceipts(
      1,
      0,
      selectedCollectionId,
      orderParams.orderCol,
      orderParams.orderDesc
    ).then((data) => {
      setReceiptList(data.data.receiptList);
      // setTotalPrice(data.data.productPriceSum);
    });
  }, [selectedCollectionId, orderType]);

  const handleProfileImageUpload = (e) => {
    const reader = new FileReader();
    const files = e.target.files;

    reader.onload = async function (e) {
      await updateProfileImage(files[0]);
      window.location.reload();
    };

    if (files[0]) reader.readAsDataURL(files[0]);
  };

  const handleItemClick = (item, x, y, translateX) => {
    setSummaryItem(item);
    setSummaryPosition({ x, y, translateX });
  };

  const handleShowDetailClick = () => {
    router.push(`/receipt/${summaryItem.id}`);
  };

  const handleTotalPriceButtonClick = () => {
    setIsTotalPriceModalShown(true);
  };

  const handleBadgeClick = () => {
    setIsBadgeModalShown(true);
  };

  const handleEditCollectionClick = () => {
    setIsCollectionListOpen(true);
  };

  const handleCreateCollectionButtonClick = () => {
    setIsCreateCollectionPopupOpen(true);
  };

  const handleCreateCollectionSubmit = (collectionName) => {
    createCategories(collectionName)
      .then(() => {
        alert('새로운 컬렉션이 생성되었습니다.');
        window.location.reload();
      })
      .catch(({ response }) => {
        alert(response);
      });
  };

  const handleSelectedCollectionChange = (collectionId) => {
    if (selectedCollectionId === collectionId) {
      setIsCollectionEditSelectorOpen(true);
      return;
    }

    setSummaryItem(null);
    setSelectedCollectionId(collectionId);
    window.localStorage.setItem('selectedCollectionId', collectionId);
  };

  const handleChangeCollectionNameClick = () => {
    setIsCollectionEditSelectorOpen(false);
    setIsChangeCollectionNamePopupOpen(true);
  };

  const handleChangeCollectionNameSubmit = (collectionName) => {
    changeCategoryName(selectedCollectionId, collectionName)
      .then(() => {
        alert('컬렉션 이름이 변경되었습니다.');
        window.location.reload();
      })
      .catch(({ response }) => {
        alert(response);
      });
  };

  const handleDeleteCollectionClick = () => {
    setIsCollectionEditSelectorOpen(false);
    setIsDeletePopupShown(true);
  };

  const handleDeleteCollectionSubmit = () => {
    deleteCategories(selectedCollectionId)
      .then(() => {
        alert('컬렉션이 삭제되었습니다.');
        window.location.reload();
      })
      .catch(({ response }) => {
        alert(response);
      });
  }

  const handleOrderChange = (e) => {
    window.localStorage.setItem('orderType', e.target.value);
    setOrderType(e.target.value);
  };

  if (!receiptList || !collections)
    return (
      <Layout hideTop showLogo>
        loading...
      </Layout>
    );

  return (
    <Layout hideTop showLogo>
      <Profile>
        <ProfileImageWrapper>
          <FileInputLabel
            image={userInfo.data.profileImage || '/icons/add-user.png'}
            onChange={handleProfileImageUpload}
            imageWidth={userInfo.data.profileImage ? '100%' : '50%'}
            imageHeight={userInfo.data.profileImage ? '100%' : '50%'}
          />
        </ProfileImageWrapper>
        <NicknameWrapper>
          <img src={badgeImage} alt='user-badge' onClick={handleBadgeClick} />
          <Nickname>{userInfo.data.nickname}</Nickname>
        </NicknameWrapper>
      </Profile>
      {receiptList.length === 0 && (
        <UploadGuideText>
          우측 하단의 &#39;+&#39; 버튼을 눌러 내 애장품을 등록해보세요🙂
        </UploadGuideText>
      )}

      <HeaderContainer showBorder={receiptList.length > 0}>
        <Title>내 애장품 컬렉션</Title>
        <CollectionListToggleWrapper>
          <CollectionListToggle
            isOpen={isCollectionListOpen}
            onClick={() => setIsCollectionListOpen(!isCollectionListOpen)}
          >
            <img
              src='/icons/down-arrow.png'
              alt='collection-list-toggle-arrow'
            />
          </CollectionListToggle>
        </CollectionListToggleWrapper>
        <TotalPriceButton onClick={handleTotalPriceButtonClick}>
          ₩
        </TotalPriceButton>
        <EditButton onClick={handleEditCollectionClick}>
          <img src='/icons/edit.png' alt='edit' />
        </EditButton>
        <ListTypes>
          <ListType
            src='/icons/grid-icon.png'
            alt='grid-icon'
            onClick={() => setSelectedListType('grid')}
            selected={selectedListType === 'grid'}
          />
          <ListType
            src='/icons/list-icon.png'
            alt='list-icon'
            onClick={() => setSelectedListType('list')}
            selected={selectedListType === 'list'}
          />
        </ListTypes>
      </HeaderContainer>

      <CollectionList
        isOpen={isCollectionListOpen}
        collections={collections}
        selectedCollectionId={selectedCollectionId}
        handleCreateCollectionButtonClick={handleCreateCollectionButtonClick}
        handleSelectedCollectionChange={handleSelectedCollectionChange}
        handleOrderChange={handleOrderChange}
        orderValue={orderType}
      />

      <div style={{ width: '100%', position: 'relative' }}>
        {selectedListType === 'grid' ? (
          <ReceiptsGridView
            receiptList={receiptList}
            onItemClick={handleItemClick}
          />
        ) : (
          <ReceiptsListView
            receiptList={receiptList}
            onItemClick={handleItemClick}
          />
        )}
        {summaryItem && (
          <SummaryPopup
            onCloseClick={() => setSummaryItem(null)}
            item={summaryItem}
            posX={summaryPosition.x}
            posY={summaryPosition.y}
            translateX={summaryPosition.translateX}
            onShowDetailClick={handleShowDetailClick}
          />
        )}
      </div>

      <CreateCollectionPopup
        visible={isCreateCollectionPopupOpen}
        setVisible={setIsCreateCollectionPopupOpen}
        title='새로운 컬렉션의 이름을 지어주세요'
        onSubmit={handleCreateCollectionSubmit}
        confirmText='컬렉션 만들기'
        value=''
      />

      <ChangeCollectionNamePopup
        visible={isChangeCollectionNamePopupOpen}
        setVisible={setIsChangeCollectionNamePopupOpen}
        title='변경할 컬렉션의 이름을 입력해주세요'
        onSubmit={handleChangeCollectionNameSubmit}
        confirmText='이름 변경하기'
        value=''
      />

      <HeaderTextModal
        isOpen={isTotalPriceModalShown}
        onCloseClick={() => setIsTotalPriceModalShown(false)}
        title='구매가 합계'
      >
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
          <b>컬렉션 전체 {priceSumList.reduce((acc, cur) => acc + cur.priceSum, 0).toLocaleString()}원</b>
          <br />
          {priceSumList.map((item) => {
            return (
              <>{item.name} {item.priceSum}원<br/></>
            )
          })}
        </div>
      </HeaderTextModal>
      <BadgeModal
        isOpen={isBadgeModalShown}
        onCloseClick={() => setIsBadgeModalShown(false)}
      />
      {/* {isCollectionEditSelectorOpen && ( */}
      <CollectionEditButtons
        isOpen={isCollectionEditSelectorOpen}
        modalBoxStyle={{
          maxWidth: '400px',
          minWidth: '256px',
          minHeight: '140px',
          padding: '16px',
        }}
        isPortal
        onCloseClick={() => setIsCollectionEditSelectorOpen(false)}
      >
        <CollectionEditButton onClick={handleChangeCollectionNameClick}>
          이름 변경
        </CollectionEditButton>
        {collections.length > 1 && (
          <CollectionEditButton
            onClick={handleDeleteCollectionClick}
          >
            삭제
          </CollectionEditButton>
        )}
      </CollectionEditButtons>
      {/* )} */}
      <DeleteReasons
        visible={isDeletePopupShown}
        setVisible={setIsDeletePopupShown}
        onDelete={handleDeleteCollectionSubmit}
        title='폴더에 있는 모든 애장품이 삭제됩니다.'
        hideReason
      />
    </Layout>
  );
};

export default ReceiptListPage;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 12px 0;
  gap: 12px;
  border-bottom: ${(props) =>
    props.showBorder ? '1px solid var(--grey200)' : 'none'};
  padding-bottom: 12px;

  h2 {
    padding-bottom: 0;
    width: auto;
  }

  span {
    flex: 2;
    font-size: 14px;
  }
`;

const CollectionListToggleWrapper = styled.div`
  flex: 1;
`;

const CollectionListToggle = styled.button`
  padding: 0;
  height: 100%;
  display: flex;
  align-items: center;
  transition: 0.4s all;

  img {
    width: 12px;
    height: 12px;
  }

  ${(props) =>
    props.isOpen &&
    css`
      transform: rotate(-180deg);
    `}
`;

const Profile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 32px 0;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  img {
    border-radius: 40%;
  }
`;

const Nickname = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: var(--grey600);
  position: relative;
  display: flex;
  align-items: center;

  img {
    margin-left: 8px;
    width: 14px;
    height: 14px;
  }
`;

const ListTypes = styled.div`
  /* flex: 1; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;

  img {
  }
`;

const ListType = styled.img`
  opacity: ${(props) => (props.selected ? 1 : 0.3)};
  cursor: pointer;

  :first-of-type {
    width: 16px;
    height: 16px;
  }
  :last-of-type {
    width: 18px;
    height: 18px;
  }
`;

const HeaderButton = styled.button`
  width: 16px;
  height: 16px;

  text-align: center;
  padding: 0;
  font-size: 10px;
`;

const TotalPriceButton = styled(HeaderButton)`
  border: 1px solid black;
  border-radius: 50%;
`;
const EditButton = styled(HeaderButton)`
  img {
    width: 100%;
    height: 100%;
  }
`;

const UploadGuideText = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 40px;
  padding: 10px 16px;
  background: var(--grey200);
  border-radius: 20px;
`;

const NicknameWrapper = styled.div`
  display: flex;
  align-items: center;

  > img {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }
`;

const CreateCollectionPopup = styled(BottomTextInputPopup)``;

const ChangeCollectionNamePopup = styled(BottomTextInputPopup)``;

const CollectionEditButtons = styled(Modal)`
  display: flex;
  flex-direction: column;
  background: white;
  z-index: 1000;
  gap: 8px;
`;

const CollectionEditButton = styled(Button)`
  flex: 1;
`;
