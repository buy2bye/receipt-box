import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import apiController from 'helpers/apiController';
import Title from 'components/page/Title';

const SNSSingup = ({ redirect }) => {
  const router = useRouter();
  const [nickname, setNickname] = useState('');

  const handleRegister = () => {
    if (nickname.length === 0) {
      alert('닉네임을 입력해주세요!');
      return;
    }

    apiController()
      .post('/api/user/set-nickname', { nickname: nickname })
      .then((res) => {
        router.push(redirect);
      })
      .catch((error) => {
        const { status } = error.response;
        alert('닉네임이 중복됩니다!');
      });
  };

  const handleLater = () => {
    apiController()
      .post('/api/user/set-nickname', { nickname: null })
      .then((res) => {
        router.push(redirect);
      });
  };

  const handleChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  return (
    <Container>
      <Title>닉네임을 설정해주세요.</Title>
      <NicknameForm>
        <div className='inputLabel'>
          <input
            type='text'
            placeholder='바이투바이'
            id='nickname'
            onChange={handleChangeNickname}
          />
        </div>
      </NicknameForm>
      <Buttons>
        <button
          className='login__login-button primary'
          onClick={handleRegister}
        >
          가입하기
        </button>
        <button className='login__login-button secondary' onClick={handleLater}>
          나중에
        </button>
      </Buttons>
    </Container>
  );
};

export default SNSSingup;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 24px 24px 80px 24px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NicknameForm = styled.div`
  width: 100%;
  flex: 1;

  .inputLabel {
    position: relative;
    width: 100%;
    font-size: 14px;

    input {
      width: 100%;
      height: 60px;
      margin: 8px 0 40px 0;
      border-radius: 16px;
      padding: 0 12px;
      font-size: 16px;
      font-weight: 400;
      border: none;
      border: 1px solid var(--grey400);
      color: var(--grey900);
      font-weight: 300;

      ::placeholder {
        color: var(--grey400);
        font-weight: 300;
      }
    }
  }
`;

const Buttons = styled.div`
  width: 100%;

  .login__login-button {
    width: 100%;
    height: 60px;
    margin-bottom: 12px;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    :active {
      opacity: 0.6;
    }
  }
  .primary {
    background: var(--primary);
    border-color: var(--primary);
    color: black;
  }

  .secondary {
    background: var(--grey100);
    border-color: var(--grey100);
    color: black;
  }
`;
