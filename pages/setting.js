import { useState } from 'react';
import styled from '@emotion/styled';
import ConfirmModal from 'components/modal/ConfirmModal';
import WithdrawalModal from 'components/setting/WithdrawalModal';
import apiController from 'helpers/apiController';
import WrapAuthPage from 'helpers/AuthWrapper';
import { kickout } from 'helpers/auth';
import Link from 'next/link';
import Layout from 'components/layout/Layout';
import BottomTextInputPopup from 'components/popup/BottomTextInputPopup';

const SettingPage = ({ userInfo }) => {
  const [showNicknameChangePopup, setShowNicknameChangePopup] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isWithdrawalModalOpen, setWithdrawalModalOpen] = useState(false);

  const [nickname, setNickname] = useState(userInfo.nickname);
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleNicknameSubmit = () => {
    if (nickname !== userInfo.nickname) {
      apiController()
        .post('/api/user/set-nickname', { nickname: nickname})
        .then(() => {
          alert('닉네임이 변경되었습니다!');
          window.location.reload();
        })
        .catch(({ response }) => {
          if (response.status === 409) {
            alert('사용할 수 없는 닉네임입니다.');
          }
        })
    } else {
      setShowNicknameChangePopup(false);
    }
  };

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
        {renderRow('닉네임', (
          <>
            <button onClick={() => setShowNicknameChangePopup(true)} style={{ background: 'white' }}>
              <img src='/icons/edit.png' alt='edit' width={14} height={14}/>
            </button>
            {userInfo.nickname}
          </>
        ))}
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
      <BottomTextInputPopup
        visible={showNicknameChangePopup}
        setVisible={setShowNicknameChangePopup}
        title='변경할 닉네임을 입력해주세요'
        // placeholder='예) 맥북 2022'
        onInputChange={handleNicknameChange}
        onSubmit={handleNicknameSubmit}
        confirmText='변경하기'
        value={nickname}
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
  cursor: pointer;
  width: 100%;
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
