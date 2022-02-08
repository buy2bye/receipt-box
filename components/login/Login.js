import styled from '@emotion/styled';
import useMe from 'hooks/useMe';
import Tutorial from '/components/login/Tutorial';

const Login = () => {
  const { mutate } = useMe();

  const handleKakaoLogin = () => {
    mutate(true, false);
  };
  const handleEmailLogin = () => {
    mutate(true, false);
  };

  return (
    <Container>
      <Tutorial className='login__tutorial' />
      <button className='login__login-button kakao' onClick={handleKakaoLogin}>
        <img className='kakao-icon' src='icons/kakao.svg' alt='kakao-icon' />
        <span>카카오로 시작하기</span>
      </button>
      <button className='login__login-button normal' onClick={handleEmailLogin}>
        <span>이메일로 시작하기</span>
      </button>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 20px;
  overflow-y: hidden;

  .login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .login__tutorial {
    width: 100%;
    height: 80%;
    background: rgba(0, 0, 0, 0.5);
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
    background: var(--grey200);
    border-color: var(--grey200);
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
