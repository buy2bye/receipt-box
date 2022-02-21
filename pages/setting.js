import { useState } from 'react';
import styled from '@emotion/styled';
import ConfirmModal from 'components/modal/ConfirmModal';
import WithdrawalModal from 'components/setting/WithdrawalModal';
import apiController from 'helpers/apiController';
import WrapAuthPage from 'helpers/AuthWrapper';
import { kickout } from 'helpers/auth';
import Link from 'next/link';

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
          {text}
        </Link>
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
      <Container>
        <Title>설정</Title>
        {renderRow('계 정', userInfo.username || userInfo.snsIdentifier)}
        {renderRow('닉 네 임', userInfo.nickname || userInfo.nickname)}
        <Row>
          <Button onClick={() => setLogoutModalOpen(true)}>로그아웃</Button>
        </Row>
        <Row>
          <Button onClick={() => setWithdrawalModalOpen(true)}>회원탈퇴</Button>
        </Row>
        {renderRow('카카오문의', '준비중')}
        {renderLink('이용약관', '')}
        {renderLink('개인정보처리방침', '')}
        {renderLink('마케팅정보 수신동의', '')}
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

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 20px 20px 80px 20px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 16px;
`;

const Row = styled.div`
  min-width: 400px;
  display: flex;
  flex-direction: row;
  font-size: 16px;
  margin: 16px;
`;

const RowTitle = styled.div`
  flex: 4;
  font-weight: bold;
`;

const RowContent = styled.div`
  flex: 6;
`;

const Button = styled.button`
  background: white;
  width: 100%;
  height: 40px;
  border: 1px solid black;
  border-radius: 4px;
`;
