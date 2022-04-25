import styled from '@emotion/styled';
import Title from 'components/page/Title';
import Layout from 'components/layout/Layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReceiptsListView from './receipt/ReceiptsListView';
import ReceiptsGridView from './receipt/ReceiptsGridView';
import SummaryPopup from './receipt/SummaryPopup';
import LoginModal from './login/LoginModal';
import TextModal from './modal/TextModal';
import HeaderTextModal from './modal/HeaderTextModal';
import LogoHeaderModal from './modal/LogoHeaderModal';

const receiptList = [
  {
    id: 1,
    nickname: '쵸파 피규어 (예시)',
    productDate: '2022-03-10',
    productImage: '/preview/preview-chopper.png',
    productName: '쵸파 탱크 프라모델',
    productPlace: '애니통(네이버쇼핑)',
    productPrice: 9600,
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
  const [selectedListType, setSelectedListType] = useState('grid');
  const [summaryItem, setSummaryItem] = useState(receiptList[0]);
  const [summaryPosition, setSummaryPosition] = useState({});
  const totalPrice = 15370000;
  const [isTotalPriceModalShown, setIsTotalPriceModalShown] = useState(false);
  const [isBadgeModalShown, setIsBadgeModalShown] = useState(false);


  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleItemClick = (item, x, y, translateX) => {
    setSummaryItem(item);
    setSummaryPosition({ x, y, translateX })
  };

  const handleShowDetailClick = () => {
    router.push(`/preview/${summaryItem.id}`);
  };

  const handleTotalPriceButtonClick = () => {
    setIsTotalPriceModalShown(true);
  };

  const handleBadgeClick = () => {
    setIsBadgeModalShown(true);
  };

  return (
    <Layout hideTop showLogo isPreview>
      <HeaderLeftButton onClick={handleLoginClick}>로그인</HeaderLeftButton>
      <Profile>
        <ProfileImageWrapper>
          <img src='/preview/preview-profile.png' alt='preview-profile' />
        </ProfileImageWrapper>
        <NicknameWrapper>
          <img
            src='/icons/box.png'
            alt='user-badge'
            onClick={handleBadgeClick}
          />
          <Nickname>슬버</Nickname>
        </NicknameWrapper>
      </Profile>
      <UploadGuideText>
        우측 하단의 &#39;+&#39; 버튼을 눌러 내 애장품을 등록해보세요🙂
      </UploadGuideText>
      <HeaderContainer showBorder>
        <Title>내 애장품 리스트</Title>
        <TotalPriceButton onClick={handleTotalPriceButtonClick}>
          ₩
        </TotalPriceButton>
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
      <div style={{width: '100%', position: 'relative'}}>
        {selectedListType === 'grid' ? (
          <ReceiptsGridView
            receiptList={receiptList}
            onItemClick={handleItemClick}
            isPreview
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
      <LoginModal
        isOpen={isLoginModalOpen}
        onCloseClick={() => setIsLoginModalOpen(false)}
      />
      <HeaderTextModal
        isOpen={isTotalPriceModalShown}
        onCloseClick={() => setIsTotalPriceModalShown(false)}
        title='구매가 합계'
      >
        {totalPrice.toLocaleString()}원
      </HeaderTextModal>
      <LogoHeaderModal
        isOpen={isBadgeModalShown}
        onCloseClick={() => setIsBadgeModalShown(false)}
      >
        무소유: 0개 등록 시<br /> 미니멀리스트 : 1~10개 등록 시<br /> 초보
        수집가 : 11~20개 등록 시<br /> 프로수집가 지망생 : 21~30개 등록 시<br />
        나는야 프로수집가 : 31~40개 등록 시<br /> 진정한 수집광 : 41~50개 등록
        시<br />
      </LogoHeaderModal>
    </Layout>
  );
};

export default ReceiptListPreviewPage;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 12px 0;
  border-bottom: ${(props) =>
    props.showBorder ? '1px solid var(--grey200)' : 'none'};
  padding-bottom: 12px;

  h2 {
    padding-bottom: 0;
    width: auto;
  }

  span {
    font-size: 14px;
  }
`;

const TotalPriceButton = styled.button`
  width: 16px;
  height: 16px;
  border: 1px solid black;
  border-radius: 50%;
  margin-left: 6px;
  text-align: center;
  padding: 0;
  font-size: 10px;
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
  flex: 1;
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
