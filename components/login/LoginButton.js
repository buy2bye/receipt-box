import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

const LoginButton = ({ type, onClick }) => {
  const router = useRouter();

  const handleKakaoLoginClick = () => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${router.pathname}`;

    window.location.href = KAKAO_AUTH_URL;
  };

  const handleEmailLoginClick = () => {
    router.push(`/login?type=email&redirect=${router.pathname}`);
  };

  // apple login
  if (type === 'apple')
    return (
      <>
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
          <meta name='appleid-signin-state' content={router.pathname} />
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

        <Container
          id='appleid-signin'
          type='apple'
          data-color='black'
          data-border='true'
          data-type='sign in'
        />
      </>
    );

  // kakao login
  if (type === 'kakao')
    return (
      <Container type='kakao' onClick={handleKakaoLoginClick}>
        <img className='kakao-icon' src='icons/kakao.svg' alt='kakao-icon' />
        <span>카카오로 시작하기</span>
      </Container>
    );

  // email login
  return (
    <Container type='email' onClick={handleEmailLoginClick}>
      <span>이메일로 시작하기</span>
    </Container>
  );
};

export default LoginButton;

const Container = styled.button`
  width: 100%;
  height: 44px;
  margin-bottom: 8px;
  border-radius: 8px;
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

  ${({ type }) =>
    type === 'apple'
      ? css`
          > div {
            max-width: none !important;
          }
        `
      : type === 'kakao'
      ? css`
          background: var(--kakao);
          border-color: var(--kakao);
          color: black;
        `
      : css`
          background: var(--grey100);
          border-color: var(--grey100);
          color: black;
        `}
`;
