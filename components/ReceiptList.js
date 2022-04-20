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

const ReceiptListPage = ({ userInfo }) => {
  const [receiptList, setReceiptList] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showNicknameChangePopup, setShowNicknameChangePopup] = useState(false);
  const [selectedListType, setSelectedListType] = useState('grid');
  const [summaryItem, setSummaryItem] = useState();

  const { updateProfileImage, updateNickname } = userApi();

  useEffect(() => {
    const { getReceipts } = receiptApi();
    getReceipts().then((data) => {
      setReceiptList(data.data.receiptList);
      setTotalCount(data.data.totalCount);
    });
  }, []);

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
  }

  const handleShowDetailClick = () => {
    router.push(`/receipt/${summaryItem.id}`);
  }

  if (!receiptList)
    return (
      <Layout hideTop showLogo>
        loading...
      </Layout>
    );

  return (
    <Layout hideTop showLogo>
      <HeaderLeftButton onClick={handleLoginClick}>로그인하기</HeaderLeftButton>
      <Profile>
        <ProfileImageWrapper>
          <FileInputLabel
            image={userInfo.profile_image || '/icons/add-user.png'}
            onChange={handleProfileImageUpload}
            imageWidth={userInfo.profile_image ? '100%' : '50%'}
            imageHeight={userInfo.profile_image ? '100%' : '50%'}
          />
        </ProfileImageWrapper>
        <Nickname onClick={handleNicknameEditClick}>
          {userInfo.nickname}
          <img src='/icons/edit.png' alt='edit' width={14} height={14} />
        </Nickname>
      </Profile>
      {receiptList.length < 1 && (
        <UploadGuideHeader>
          <Title>내 물건 영수증을 등록해보세요 🙂</Title>
          <Subtitle>온라인 주문내역 캡쳐화면도 등록할 수 있어요 </Subtitle>
        </UploadGuideHeader>
      )}
      <HeaderContainer showBorder={receiptList.length > 0}>
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
      <TextModal
        isOpen={isLoginModalOpen}
        onCloseClick={() => setIsLoginModalOpen(false)}
      >
        <button>일반로그인</button>
        <button>애플로그인</button>
        <button>카카오로그인</button>
      </TextModal>
      {summaryItem && (
        <SummaryPopup
          onCloseClick={() => setSummaryItem(null)}
          item={summaryItem}
          onShowDetailClick={handleShowDetailClick}
        />
      )}
      <BottomTextInputPopup
        visible={showNicknameChangePopup}
        setVisible={setShowNicknameChangePopup}
        title='변경할 닉네임을 입력해주세요'
        onSubmit={handleNicknameSubmit}
        confirmText='변경하기'
        value={userInfo.nickname}
      />
    </Layout>
  );
};

export default ReceiptListPage;

const UploadGuideHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--grey200);
  margin-bottom: 20px;
`;

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
  padding: 40px 0 52px 0;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Nickname = styled.div`
  font-size: 16px;
  font-weight: 300;
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
