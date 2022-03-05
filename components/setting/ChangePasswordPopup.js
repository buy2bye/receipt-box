import styled from '@emotion/styled';
import Button from 'components/button/Button';
import { useEffect, useState } from 'react';
import BottomPopup from 'components/popup/BottomPopup';

const ChangePasswordPopup = ({
  visible,
  setVisible,
  className,
  title,
  onSubmit,
  confirmText = '다음',
}) => {
  const [isFetching, setIsFetching] = useState(false);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');

  useEffect(() => {
    setPassword('');
    setNewPassword('');
    setNewPasswordCheck('');
  }, [visible]);

  const handleClick = async () => {
    if (newPassword.length < 6) {
      return alert('비밀번호를 6자리 이상 입력해주세요.');
    }
    if (newPassword !== newPasswordCheck) {
      return alert('새 비밀번호가 일치하지 않습니다.');
    }
    setIsFetching(true);
    await onSubmit(password, newPassword);
    setIsFetching(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) handleClick();
  };

  return (
    <Container
      visible={visible}
      className={className}
      setVisible={setVisible}
      title={title}
    >
      <InputWrapper>
        <TextInput>
          <input
            type='password'
            placeholder='6자리 이상'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <label htmlFor='password'>현재 비밀번호</label>
        </TextInput>
        <TextInput>
          <input
            type='password'
            placeholder='6자리 이상'
            id='new_password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <label htmlFor='new_password'>새 비밀번호</label>
        </TextInput>
        <TextInput>
          <input
            type='password'
            placeholder='6자리 이상'
            id='new_password_check'
            value={newPasswordCheck}
            onChange={(e) => setNewPasswordCheck(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <label htmlFor='new_password_check'>새 비밀번호 확인</label>
        </TextInput>
      </InputWrapper>
      <Button primary onClick={handleClick} isLoading={isFetching}>
        {confirmText}
      </Button>
    </Container>
  );
};

export default ChangePasswordPopup;

const Container = styled(BottomPopup)`
  height: 376px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TextInput = styled.div`
  position: relative;
  font-size: 14px;

  label {
    position: absolute;
    top: 8px;
    left: 12px;
    color: var(--grey700);
  }

  input {
    width: 100%;
    height: 60px;
    padding: 24px 12px 0 12px;
    font-size: 15px;
    border-radius: 8px;
    font-weight: 400;
    border: none;
    border: 1px solid var(--grey300);
    color: var(--grey900);
    font-weight: 300;

    ::placeholder {
      color: var(--grey400);
      font-weight: 300;
    }
  }
`;
