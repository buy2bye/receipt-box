import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Tutorial from '../components/main/Tutorial';

export default function Home() {
  const router = useRouter();
  const handleSocialLogin = () => {
    router.push('/main');
  };

  return (
    <Container>
      <Head>
        <title>Receipt Box</title>
        <meta name='description' content='Receipt Box' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='main'>
        <Tutorial className='main__tutorial' />
        <button
          className='main__login-button kakao'
          onClick={handleSocialLogin}
        >
          <img className='kakao-icon' src='icons/kakao.svg' alt='kakao-icon' />
          <span>카카오로 시작하기</span>
        </button>
        <button
          className='main__login-button normal'
          onClick={handleSocialLogin}
        >
          <span>이메일로 시작하기</span>
        </button>
      </main>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .main__tutorial {
    width: 100%;
    height: 80%;
    background: rgba(0, 0, 0, 0.5);
  }

  .main__login-button {
    width: 400px;
    max-width: 100%;
    height: 60px;
    margin-bottom: 12px;
    border: 1px solid black;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 300;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    :active {
      background: white;
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
    color: var(--grey900);
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
