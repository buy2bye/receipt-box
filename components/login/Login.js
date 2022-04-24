import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import styled from '@emotion/styled';
import Tutorial from '/components/login/Tutorial';
import apiController from 'helpers/apiController';
import { setCookie } from 'helpers/cookie';
import Link from 'next/link';
import Button from 'components/button/Button';
import Layout from 'components/layout/Layout';

const Login = () => {
  const router = useRouter();
  const isEmailLogin = router.query.type === 'email';

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isLoginFetching, setIsLoginFetching] = useState(false);

  const handleKakaoLogin = () => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = KAKAO_AUTH_URL;
  };

  const handleEmailLogin = () => {
    router.push({
      query: { type: 'email' },
    });
  };

  const handleLogin = () => {
    setIsLoginFetching(true);
    apiController()
      .post('/api/auth/login', { username, password })
      .then((res) => {
        const { data } = res;
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken);
        router.query.redirect
          ? router.push(router.query.redirect)
          : router.push('/');
      })
      .catch(() => {
        alert('아이디나 비밀번호나 없거나 올바르지 않습니다.');
      });
    setIsLoginFetching(false);
  };

  const handlePasswordKeyDown = (e) => {
    if (e.keyCode === 13) handleLogin();
  };

  const renderLoginMain = () => (
    <div className='login-buttons'>
      <button
        className='login__login-button preview'
        onClick={() => router.push('/preview')}
      >
        <span>서비스 둘러보기</span>
      </button>
      <button className='login__login-button kakao' onClick={handleKakaoLogin}>
        <img className='kakao-icon' src='icons/kakao.svg' alt='kakao-icon' />
        <span>카카오로 시작하기</span>
      </button>
      <button
        id='appleid-signin'
        className='login__login-button apple'
        data-color='black'
        data-border='true'
        data-type='sign in'
      />
      <button className='login__login-button normal' onClick={handleEmailLogin}>
        <span>이메일로 시작하기</span>
      </button>
    </div>
  );

  const renderEmailLogin = () => (
    <EmailLoginForm>
      <div className='inputLabel'>
        <input
          type='text'
          placeholder='slowbird@gmail.com'
          id='email'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor='email'>이메일</label>
      </div>
      <div className='inputLabel'>
        <input
          type='password'
          placeholder='6자리 이상'
          id='password'
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handlePasswordKeyDown}
        />
        <label htmlFor='password'>비밀번호</label>
      </div>
      <Button primary onClick={handleLogin} isLoading={isLoginFetching}>
        로그인
      </Button>

      <Link
        href={
          router.query.redirect
            ? `/signup?redirect=${router.query.redirect}`
            : '/signup'
        }
        passHref
      >
        <div className='sign-up'>회원 가입하기</div>
      </Link>
      <Link href='https://pf.kakao.com/_IxmxdJb/chat' passHref>
        <div className='kakao-link'>고객센터 연락하기{' >'}</div>
      </Link>
    </EmailLoginForm>
  );

  return (
    <Container hideTop showLogo hideSetting hideBottom>
      <Head>
        <meta
          name='appleid-signin-client-id'
          content={process.env.NEXT_PUBLIC_APPLE_CLIENT_ID}
        />
        <meta name='appleid-signin-scope' content='email' />
        <meta
          name='appleid-signin-redirect-uri'
          content={process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI}
        />
        <meta name='appleid-signin-state' content='aa' />
        <meta
          name='appleid-signin-nonce'
          content={process.env.NEXT_PUBLIC_APPLE_NONCE}
        />
        <meta name='appleid-signin-use-popup' content='false' />
      </Head>
      <Script
        type='text/javascript'
        src='https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js'
      />
      <Tutorial className='login__tutorial' />
      {isEmailLogin ? renderEmailLogin() : renderLoginMain()}
    </Container>
  );
};

export default Login;

const Container = styled(Layout)`
  overflow-x: hidden;
  padding: 0 0 24px 0;

  .login__tutorial {
    width: 100%;
    flex: 1;
  }

  .login-buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 24px;
  }

  .login__login-button {
    width: 100%;
    height: 40px;
    margin-bottom: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0;

    :active {
      opacity: 0.6;
    }
  }

  .preview {
    background: var(--white);
    border: 1px solid var(--blue700);
    color: var(--blue700);
    border-radius: 8px;
    margin-bottom: 16px;
    height: 50px;
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
    left: 24px;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
  }

  .apple > div {
    max-width: none !important;
  }
`;

const EmailLoginForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;

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
      width: 100%;
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
    width: 100%;
    height: 60px;
    margin-bottom: 12px;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 400;
    background: var(--blue500);
    color: white;
  }

  .sign-up {
    cursor: pointer;
    margin-top: 8px;
    font-size: 14px;
    color: var(--grey900);
    font-weight: 400;
    text-decoration: underline;
    text-underline-position: under;
  }

  .kakao-link {
    cursor: pointer;
    margin-top: 12px;
    font-size: 12px;
    color: var(--grey900);
    font-weight: 300;
  }
`;
