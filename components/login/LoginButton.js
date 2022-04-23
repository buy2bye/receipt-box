import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Head from 'next/head';
import Script from 'next/script';

const LoginButton = ({ type, onClick }) => {
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
          <meta
            name='appleid-signin-state'
            content={process.env.NEXT_PUBLIC_APPLE_STATE}
          />
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
      <Container type='kakao'>
        <img className='kakao-icon' src='icons/kakao.svg' alt='kakao-icon' />
        <span>카카오로 시작하기</span>
      </Container>
    );

  // email login
  return (
    <Container type='email'>
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
