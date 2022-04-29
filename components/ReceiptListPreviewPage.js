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
import BadgeModal from './modal/BadgeModal';

const receiptList = [
  {
    id: 1,
    nickname: '나의 영웅 아이언맨 피규어 (예시)',
    productDate: '2022-04-13',
    productImage: '/preview/preview-1.png',
    productName: '아이언맨 MK85 1/4',
    productPlace: '네이버쇼핑',
    productPrice: 2799000,
  },
  {
    id: 2,
    nickname: '피규어에 입덕하게 해준 해리포터',
    productDate: '2022-03-01',
    productImage: '/preview/preview-2.png',
    disabled: true,
  },
  {
    id: 3,
    nickname: 'M24 채피',
    productDate: '2022-02-02',
    productImage: '/preview/preview-3.png',
    disabled: true,
  },
  {
    id: 4,
    nickname: '생일선물로 받은 맥북',
    productDate: '2021-12-30',
    productImage: '/preview/preview-4.png',
    disabled: true,
  },
  {
    id: 5,
    nickname: '엄마가 사준 애플워치SE',
    productDate: '2021-11-29',
    productImage: '/preview/preview-5.png',
    disabled: true,
  },
  {
    id: 6,
    nickname: '첫 아이폰13',
    productDate: '2021-10-15',
    productImage: '/preview/preview-6.png',
    disabled: true,
  },
  {
    id: 7,
    nickname: 'GTX1080 Ti',
    productDate: '2021-09-30',
    productImage: '/preview/preview-7.png',
    disabled: true,
  },
  {
    id: 8,
    nickname: 'ASUS Prime H410M-K',
    productDate: '2021-09-28',
    productImage: '/preview/preview-8.png',
    disabled: true,
  },
  {
    id: 9,
    nickname: '하이닉스 Gold P31',
    productDate: '2021-09-15',
    productImage: '/preview/preview-9.png',
    disabled: true,
  },
  {
    id: 10,
    nickname: '첫 월급으로 산 프라다 버킷백',
    productDate: '2021-08-07',
    productImage: '/preview/preview-10.png',
    disabled: true,
  },
  {
    id: 11,
    nickname: '1주년 기념선물 딥디크 탐다오',
    productDate: '2021-07-13',
    productImage: '/preview/preview-11.png',
    disabled: true,
  },
  {
    id: 12,
    nickname: '이얼즈어고 가디건',
    productDate: '2021-06-30',
    productImage: '/preview/preview-12.png',
    disabled: true,
  },
  {
    id: 13,
    nickname: '스코틀랜드에서 사온 맥캘란',
    productDate: '2021-05-05',
    productImage: '/preview/preview-13.png',
    disabled: true,
  },
  {
    id: 14,
    nickname: '발렌타인에 마신 돔페리뇽 발렌타인',
    productDate: '2021-03-14',
    productImage: '/preview/preview-14.png',
    disabled: true,
  },
  {
    id: 15,
    nickname: '크리스마스에 마신 글렌알라키',
    productDate: '2020-12-24',
    productImage: '/preview/preview-15.png',
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
    setSummaryPosition({ x, y, translateX });
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
    <Layout
      hideTop
      showLogo
      isPreview
      onLoginClick={() => setIsLoginModalOpen(true)}
    >
      <Profile>
        <ProfileImageWrapper>
          <img src='/preview/preview-profile.png' alt='preview-profile' />
        </ProfileImageWrapper>
        <NicknameWrapper>
          <img
            src='/icons/badge/badge-11.png'
            alt='user-badge'
            onClick={handleBadgeClick}
          />
          <Nickname>나는야수집가</Nickname>
        </NicknameWrapper>
      </Profile>
      <UploadGuideText>
        우측 하단의 &#39;+&#39; 버튼을 눌러 내 애장품을 등록해보세요🙂
      </UploadGuideText>
      <HeaderContainer showBorder>
        <Title>내 애장품 컬렉션</Title>
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
      <div style={{ width: '100%', position: 'relative' }}>
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
      <BadgeModal
        isOpen={isBadgeModalShown}
        onCloseClick={() => setIsBadgeModalShown(false)}
      />
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
  position: absolute;
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
