import styled from '@emotion/styled';
import Title from 'components/page/Title';
import Subtitle from 'components/page/Subtitle';
import Layout from 'components/layout/Layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import receiptApi from 'api/receipt';
import TextModal from './modal/TextModal';
import FileInputLabel from './common/FileInputLabel';
import userApi from 'api/user';
import BottomTextInputPopup from './popup/BottomTextInputPopup';
import ReceiptsListView from './receipt/ReceiptsListView';
import ReceiptsGridView from './receipt/ReceiptsGridView';
import SummaryPopup from './receipt/SummaryPopup';
import HeaderTextModal from './modal/HeaderTextModal';
import BadgeModal from './modal/BadgeModal';
import { css } from '@emotion/react';

const ReceiptListPage = ({ userInfo }) => {
  const router = useRouter();
  const [receiptList, setReceiptList] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isTotalPriceModalShown, setIsTotalPriceModalShown] = useState(false);
  const [showNicknameChangePopup, setShowNicknameChangePopup] = useState(false);
  const [selectedListType, setSelectedListType] = useState('grid');
  const [summaryItem, setSummaryItem] = useState();
  const [summaryPosition, setSummaryPosition] = useState({});
  const [isBadgeModalShown, setIsBadgeModalShown] = useState(false);
  const [isCollectionListOpen, setIsCollectionListOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState();
  const { updateProfileImage, updateNickname } = userApi();
  const [categories, setCategories] = useState();

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
    const { getReceipts, getCategories } = receiptApi();
    let firstCategoryId;
    getCategories().then((data) => {
      setCategories(data.data.categoryList);
      firstCategoryId = data.data.categoryList[0].id;

      getReceipts(1, 0, firstCategoryId).then((data) => {
        setReceiptList(data.data.receiptList);
        setTotalCount(data.data.totalCount);
        setTotalPrice(data.data.productPriceSum);
      });
    });
  }, []);

  const handleProfileImageUpload = (e) => {
    const reader = new FileReader();
    const files = e.target.files;

    reader.onload = async function (e) {
      await updateProfileImage(files[0]);
      window.location.reload();
    };

    if (files[0]) reader.readAsDataURL(files[0]);
  };

  const handleNicknameSubmit = async (nickname) => {
    await updateNickname(nickname);
    window.location.reload();
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

  if (!receiptList || !categories)
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

      {/* collection 리스트 */}
      <CollectionList isOpen={isCollectionListOpen}>
        {categories.map((category) => (
          <CollectionSelector
            isSelected={selectedCollection === category.name}
            isOpen={isCollectionListOpen}
            onClick={() => setSelectedCollection(category.name)}
          >
            {category.name}
          </CollectionSelector>
        ))}
        <AddNewCollectionButton>asd</AddNewCollectionButton>
      </CollectionList>

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
      <BottomTextInputPopup
        visible={showNicknameChangePopup}
        setVisible={setShowNicknameChangePopup}
        title='변경할 닉네임을 입력해주세요'
        onSubmit={handleNicknameSubmit}
        confirmText='변경하기'
        value={userInfo.data.nickname}
      />
      <HeaderTextModal
        isOpen={isTotalPriceModalShown}
        onCloseClick={() => setIsTotalPriceModalShown(false)}
        title='구매가 합계'
      >
        {totalPrice.toLocaleString()}원
      </HeaderTextModal>
      <BadgeModal
        isOpen={isBadgeModalShown}
        onCloseClick={() => setIsBadgeModalShown(false)}
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

const CollectionList = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  transition: 0.4s all;

  ${(props) =>
    props.isOpen
      ? css`
          height: 48px;
        `
      : css`
          height: 0;
        `}
`;

const CollectionSelector = styled.button`
  padding: 4px 16px;
  height: 32px;
  border: 1px solid var(--grey400);
  border-radius: 12px;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: 0.4s all;

  ${(props) =>
    props.isSelected &&
    css`
      background: var(--grey200);
    `}
`;

const AddNewCollectionButton = styled(CollectionSelector)``;

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
