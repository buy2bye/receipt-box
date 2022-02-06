import styled from '@emotion/styled';
import Head from 'next/head';
import Image from 'next/image';
import Tutorial from '../components/main/Tutorial';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Receipt Box</title>
        <meta name='description' content='Receipt Box' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='main'>
        <Tutorial className='main__tutorial' />
        <button className='main__login-button kakao'>카카오로 로그인</button>
        <button className='main__login-button naver'>네이버로 로그인</button>
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
    height: 60%;
  }

  .main__login-button {
    width: 400px;
    max-width: 100%;
    height: 50px;
    margin-bottom: 12px;
    border: 1px solid black;
    border-radius: 12px;
    cursor: pointer;

    :active {
      background: white;
    }
  }

  .kakao {
    background: var(--kakao);
    border-color: var(--kakao);
  }

  .naver {
    background: var(--naver);
    border-color: var(--naver);
    color: white;
  }
`;
