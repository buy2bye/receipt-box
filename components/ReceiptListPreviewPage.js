import styled from '@emotion/styled';
import Title from 'components/page/Title';
import Subtitle from 'components/page/Subtitle';
import Layout from 'components/layout/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import TextModal from './modal/TextModal';
import FileInputLabel from './common/FileInputLabel';
import userApi from 'api/user';
import BottomTextInputPopup from './popup/BottomTextInputPopup';
import ReceiptsListView from './receipt/ReceiptsListView';
import ReceiptsGridView from './receipt/ReceiptsGridView';
import SummaryPopup from './receipt/SummaryPopup';
import LoginModal from './login/LoginModal';

const receiptList = [
  {
    id: 1,
    nickname: '나의 첫 애플워치',
    productDate: '2022-03-10',
    productImage: '/preview/preview-applewatch.png',
    productName: 'Apple Watch Nike SE',
    productPlace: '더현대서울 이샵',
    productPrice: 359000,
  },
  {
    id: 2,
    productImage: '/preview/preview-2.jpeg',
    disabled: true,
  },
  {
    id: 3,
    productImage: '/preview/preview-3.jpeg',
    disabled: true,
  },
  {
    id: 4,
    productImage: '/preview/preview-4.jpeg',
    disabled: true,
  },
  {
    id: 5,
    productImage: '/preview/preview-5.jpeg',
    disabled: true,
  },
  {
    id: 6,
    productImage: '/preview/preview-6.jpeg',
    disabled: true,
  },
  {
    id: 7,
    productImage: '/preview/preview-7.jpeg',
    disabled: true,
  },
  {
    id: 8,
    productImage: '/preview/preview-8.jpeg',
    disabled: true,
  },
  {
    id: 9,
    productImage: '/preview/preview-9.jpeg',
    disabled: true,
  },
];

const ReceiptListPreviewPage = ({ userInfo }) => {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showNicknameChangePopup, setShowNicknameChangePopup] = useState(false);
  const [selectedListType, setSelectedListType] = useState('grid');
  const [summaryItem, setSummaryItem] = useState();

  const { updateProfileImage, updateNickname } = userApi();

  const handleLoginClick = () => {
    // TODO: 로그인 팝업 띄우기 TextModal -> ButtonModal 등으로 새로 정의해야함
    setIsLoginModalOpen(true);
  };

  const handleProfileImageUpload = (e) => {
    const reader = new FileReader();
    const files = e.target.files;

    reader.onload = async function (e) {
      await updateProfileImage(files[0]);
      window.location.reload();
    };

    if (files[0]) reader.readAsDataURL(files[0]);
  };

  const handleNicknameEditClick = () => {
    setShowNicknameChangePopup(true);
  };

  const handleNicknameSubmit = async (nickname) => {
    await updateNickname(nickname);
    window.location.reload();
  };

  const handleItemClick = (item) => {
    setSummaryItem(item);
  };

  const handleShowDetailClick = () => {
    router.push(`/receipt/${summaryItem.id}`);
  };

  return (
    <Layout hideTop showLogo isPreview>
      <HeaderLeftButton onClick={handleLoginClick}>로그인하기</HeaderLeftButton>
      <Profile>
        <ProfileImageWrapper>
          <img src='/preview/preview-profile.png' />
        </ProfileImageWrapper>
        <Nickname onClick={handleNicknameEditClick}>슬버</Nickname>
      </Profile>
      <HeaderContainer showBorder>
        <Title>내 물건 리스트</Title>
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
      <LoginModal
        isOpen={isLoginModalOpen}
        onCloseClick={() => setIsLoginModalOpen(false)}
      />

      {summaryItem && (
        <SummaryPopup
          onCloseClick={() => setSummaryItem(null)}
          item={summaryItem}
          onShowDetailClick={handleShowDetailClick}
        />
      )}
      {/* <BottomTextInputPopup
        visible={showNicknameChangePopup}
        setVisible={setShowNicknameChangePopup}
        title='변경할 닉네임을 입력해주세요'
        onSubmit={handleNicknameSubmit}
        confirmText='변경하기'
        value={userInfo.data.nickname}
      /> */}
    </Layout>
  );
};

export default ReceiptListPreviewPage;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  margin-bottom: 12px;
  border-bottom: ${(props) =>
    props.showBorder ? '1px solid var(--grey200)' : 'none'};
  padding-bottom: 12px;

  h2 {
    flex: 8;
    padding-bottom: 0;
  }

  span {
    flex: 2;
    font-size: 14px;
  }
`;

const HeaderLeftButton = styled.button`
  position: fixed;
  top: 10px;
  left: 10px;
  height: 32px;
  background: transparent;
  padding: 8px;
  color: var(--grey500);
  font-size: 13px;
  z-index: 2;
`;

const Profile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 52px 0;
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
    width: 100%;
    height: 100%;
  }
`;

const Nickname = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: var(--grey600);
  position: relative;

  img {
    position: absolute;
    top: 50%;
    right: -24px;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
  }
`;

const ListTypes = styled.div`
  display: flex;
  justify-content: center;
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
