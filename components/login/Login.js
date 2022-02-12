import styled from '@emotion/styled';
import { useState } from 'react';
import Tutorial from '/components/login/Tutorial';
import { KAKAO_AUTH_URL } from 'helpers/oauth/kakao';

const Login = () => {
  const [isEmailLoginFormShown, setIsEmailLoginFormShown] = useState(false);

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL
  };
  const handleEmailLogin = () => {
    setIsEmailLoginFormShown(true);
  };

  return (
    <Container>
      <Tutorial className='login__tutorial' />

      {!isEmailLoginFormShown ? (
        <div className='login-buttons'>
          <button
            className='login__login-button kakao'
            onClick={handleKakaoLogin}
          >
            <img
              className='kakao-icon'
              src='icons/kakao.svg'
              alt='kakao-icon'
            />
            <span>카카오로 시작하기</span>
          </button>
          <button
            className='login__login-button normal'
            onClick={handleEmailLogin}
          >
            <span>이메일로 시작하기</span>
          </button>
        </div>
      ) : (
        <EmailLoginForm>
          <div className='inputLabel'>
            <input type='text' placeholder='slowbird@gmail.com' id='email' />
            <label htmlFor='email'>이메일</label>
          </div>
          <div className='inputLabel'>
            <input type='password' placeholder='6자리 이상' id='password' />
            <label htmlFor='password'>비밀번호</label>
          </div>
          <button className='submit-button'>로그인</button>
          <div className='sign-up'>회원 가입하기</div>
        </EmailLoginForm>
      )}
    </Container>
  );
};

export default Login;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 20px 20px 80px 20px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  .login__tutorial {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .login-buttons {
    width: 100%;
  }

  .login__login-button {
    width: 400px;
    max-width: 100%;
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

  .kakao {
    background: var(--kakao);
    border-color: var(--kakao);
    color: black;
  }

  .normal {
    background: var(--grey100);
    border-color: var(--grey100);
    color: black;
  }

  .kakao-icon {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
  }
`;

const EmailLoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .inputLabel {
    position: relative;
    width: 100%;
    font-size: 14px;

    label {
      position: absolute;
      top: 8px;
      left: 12px;
      color: var(--grey700);
    }

    input {
      width: 400px;
      max-width: 100%;
      height: 60px;
      margin-bottom: 12px;
      border-radius: 16px;
      padding: 24px 12px 0 12px;
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

  .submit-button {
    width: 400px;
    max-width: 100%;
    height: 60px;
    margin-bottom: 12px;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 400;
    background: var(--blue500);
    color: white;
  }

  .sign-up {
    margin-top: 8px;
    font-size: 14px;
    color: black;
    font-weight: 300;
    text-decoration: underline;
    text-underline-position: under;
  }
`;
