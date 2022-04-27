import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import AppleLogin from 'react-apple-login'

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
      <Container type='apple'>
        <AppleLogin
          clientId={process.env.NEXT_PUBLIC_APPLE_CLIENT_ID}
          scope="email"
          redirectURI={process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI}
          state={router.pathname.replace(/\//g, "")}
          nonce={process.env.NEXT_PUBLIC_APPLE_NONCE}
          usePopup={false}
          responseType="code id_token"
          responseMode="form_post"
          designProp={{
            width: 228,
            height: 44
          }}
        />
      </Container>
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
            width: 100%;
            height: 100%;
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
