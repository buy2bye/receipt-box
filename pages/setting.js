import { useState } from 'react';
import styled from '@emotion/styled';
import ConfirmModal from 'components/modal/ConfirmModal';
import WithdrawalModal from 'components/setting/WithdrawalModal';
import apiController from 'helpers/apiController';
import WrapAuthPage from 'helpers/AuthWrapper';
import { kickout } from 'helpers/auth';
import Link from 'next/link';
import Layout from 'components/layout/Layout';
import Button from 'components/button/Button';

const SettingPage = ({ userInfo }) => {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isWithdrawalModalOpen, setWithdrawalModalOpen] = useState(false);

  const renderRow = (title, content) => {
    return (
      <Row>
        <RowTitle>{title}</RowTitle>
        <RowContent>{content}</RowContent>
      </Row>
    );
  };

  const renderLink = (text, link) => {
    return (
      <Row>
        <Link
          style={{ color: 'black', textDecoration: 'underline' }}
          href={link}
        >
          <RowTitle>{text}</RowTitle>
        </Link>
      </Row>
    );
  };

  const renderButton = (title, onClick) => {
    return (
      <Row onClick={onClick}>
        <RowTitle>{title}</RowTitle>
      </Row>
    );
  };

  const logout = () => {
    apiController()
      .post('/api/auth/logout')
      .then(() => {
        kickout();
      });
  };

  const withdrawal = (reason) => {
    apiController()
      .post('/api/auth/withdrawal', { reason: reason })
      .then(() => {
        kickout();
      });
  };

  return (
    <>
      <Container hideBottom>
        <SettingTitle>설정</SettingTitle>
        {renderRow('계정', userInfo.username || userInfo.snsIdentifier)}
        {renderRow('닉네임', userInfo.nickname || userInfo.nickname)}
        {renderRow('카카오문의', '준비중')}
        {renderLink('이용약관', '')}
        {renderLink('개인정보처리방침', '')}
        {renderLink('마케팅 수신동의', '')}
        <Divider />
        {renderButton('로그아웃', () => setLogoutModalOpen(true))}
        {renderButton('탈퇴하기', () => setWithdrawalModalOpen(true))}
      </Container>
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        descriptionText='로그아웃 하시겠습니까?'
        yesText='로그아웃'
        onYesClick={logout}
        onNoClick={() => setLogoutModalOpen(false)}
      />
      <WithdrawalModal
        isOpen={isWithdrawalModalOpen}
        onCancelClick={() => setWithdrawalModalOpen(false)}
        onWithdrawalClick={withdrawal}
      />
    </>
  );
};

SettingPage.getInitialProps = async (ctx) => {
  const { data: userInfo } = await apiController({ ctx: ctx }).get(
    '/api/user/info'
  );
  return {
    userInfo,
  };
};

export default WrapAuthPage(SettingPage);

const Container = styled(Layout)``;

const SettingTitle = styled.div`
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
`;

const Row = styled.div`
  width: 100%;
  max-width: 720px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 400;
  box-sizing: border-box;
  padding: 18px 0;
`;

const RowTitle = styled.div`
  flex: 1;
  min-width: 120px;
  color: var(--grey700);
`;

const RowContent = styled.div`
  color: var(--grey600);
  font-weight: 300;
`;

const Divider = styled.div`
  width: 100vw;
  height: 12px;
  background: var(--grey100);
`;
