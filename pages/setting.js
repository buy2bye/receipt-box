import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import apiController from 'helpers/apiController';
import WrapAuthPage from 'helpers/AuthWrapper';
import { kickout } from 'helpers/auth';
import Link from 'next/link';
import Layout from 'components/layout/Layout';
import BottomTextInputPopup from 'components/popup/BottomTextInputPopup';
import ChangePasswordPopup from 'components/setting/ChangePasswordPopup';
import WithdrawalReasons from 'components/setting/WithdrawalReasons';
import Toggle from 'components/common/Toggle';
import BottomPopup from 'components/popup/BottomPopup';
import Button from 'components/button/Button';
import TextModal from 'components/modal/TextModal';

const SettingPage = ({ userInfo }) => {
  const [showNicknameChangePopup, setShowNicknameChangePopup] = useState(false);
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [marketingAgree, setMarketingAgree] = useState(
    userInfo.marketing_agreement
  );
  const [marketingAgreementUpdatedTime, setMarketingAgreementUpdatedTime] =
    useState('');
  const [marketingAgreeChanged, setMarketingAgreeChanged] = useState(false);
  const [showWithdrawalReasonsPopup, setShowWithdrawalReasonsPopup] =
    useState(false);
  const [nickname, setNickname] = useState(userInfo.nickname);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleNicknameSubmit = () => {
    if (nickname !== userInfo.nickname) {
      apiController()
        .post('/api/user/set-nickname', { nickname: nickname })
        .then(() => {
          alert('닉네임이 변경되었습니다!');
          window.location.reload();
        })
        .catch(({ response }) => {
          if (response.status === 409) {
            alert('사용할 수 없는 닉네임입니다.');
          }
        });
    } else {
      setShowNicknameChangePopup(false);
    }
  };

  const handleChangePasswordSubmit = (password, newPassword) => {
    apiController()
      .post('/api/user/change-password', {
        password,
        new_password: newPassword,
      })
      .then(() => {
        alert('비밀번호가 변경되었습니다!');
        setShowChangePasswordPopup(false);
      })
      .catch(({ response }) => {
        if (response.status === 403) {
          alert('비밀번호가 일치하지 않습니다.');
        }
      });
  };

  useEffect(() => {
    if (marketingAgreementUpdatedTime !== '') setMarketingAgreeChanged(true);
  }, [marketingAgreementUpdatedTime]);

  const handleMarketingAgreeChange = (e) => {
    setMarketingAgree(e.target.checked);
    apiController()
      .post('/api/user/change-marketing-agreement', {
        marketing_agreement: e.target.checked,
      })
      .then(({ data }) => {
        setMarketingAgreementUpdatedTime(data.marketing_agreement_updated_time);
      });
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
        {renderRow(
          '닉네임',
          <>
            {userInfo.nickname}
            <button onClick={() => setShowNicknameChangePopup(true)}>
              <img src='/icons/edit.png' alt='edit' width={14} height={14} />
            </button>
          </>
        )}
        {userInfo.username &&
          renderButton('비밀번호 변경하기', () =>
            setShowChangePasswordPopup(true)
          )}
        <Divider />
        {renderLink('카카오 문의하기', 'https://pf.kakao.com/_IxmxdJb/chat')}
        {renderLink(
          '공지사항',
          'https://deeply-bench-f2d.notion.site/35bc1ccf4e1245c4bdcec0d5a2e5084c'
        )}
        {renderLink('이용약관', '/agreements/terms-and-conditions')}
        {renderLink('개인정보처리방침', '/agreements/privacy-policy')}
        {renderRow(
          '마케팅 정보 수신동의',
          <Toggle
            onToggle={handleMarketingAgreeChange}
            toggleState={marketingAgree}
          />
        )}
        <Divider />
        {renderButton('로그아웃', () => setLogoutModalOpen(true))}
        {renderButton('탈퇴하기', () => setShowWithdrawalReasonsPopup(true))}
      </Container>
      <BottomPopup
        height='180px'
        title='정말 로그아웃 하시겠어요?'
        visible={isLogoutModalOpen}
        setVisible={setLogoutModalOpen}
      >
        <Button primary onClick={logout}>
          로그아웃
        </Button>
      </BottomPopup>
      <WithdrawalReasons
        visible={showWithdrawalReasonsPopup}
        setVisible={setShowWithdrawalReasonsPopup}
        onWithdrawal={withdrawal}
      />
      <BottomTextInputPopup
        visible={showNicknameChangePopup}
        setVisible={setShowNicknameChangePopup}
        title='변경할 닉네임을 입력해주세요'
        onInputChange={handleNicknameChange}
        onSubmit={handleNicknameSubmit}
        confirmText='변경하기'
        value={nickname}
      />
      <ChangePasswordPopup
        visible={showChangePasswordPopup}
        setVisible={setShowChangePasswordPopup}
        title='변경할 비밀번호를 입력해 주세요.'
        onSubmit={handleChangePasswordSubmit}
        confirmText='변경하기'
      />
      <TextModal
        isOpen={marketingAgreeChanged}
        onCloseClick={() => setMarketingAgreeChanged(false)}
      >
        <span style={{ fontWeight: 500 }}>
          마케팅 정보 수신 {marketingAgree ? '동의' : '거부'} 완료
        </span>
        <br />
        <br />
        - 전송자: 바이투바이 <br />- 수신 동의 일시:{' '}
        {marketingAgreementUpdatedTime.slice(0, 10)}
        <br />- 처리내용: 수신 {marketingAgree ? '동의' : '거부'} 처리 완료
      </TextModal>
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

const Container = styled(Layout)`
  overflow-x: hidden;
`;

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
  align-items: center;
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
  overflow-x: scroll;
`;

const Divider = styled.div`
  width: 100vw;
  min-height: 12px;
  background: var(--grey100);
`;
