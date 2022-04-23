import { css } from '@emotion/react';
import styled from '@emotion/styled';

const LoginButton = ({ type, onClick }) => {
  // apple login
  if (type === 'apple')
    return (
      <Container
        id='appleid-signin'
        type='apple'
        data-color='black'
        data-border='true'
        data-type='sign in'
      />
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
  height: 48px;
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
