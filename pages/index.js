import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Tutorial from '../components/login/Tutorial';

export default function Home() {
  // 영수증 정보 유무에 따라 렌더링 분기 필요

  return (
    <Container>
      <Head>
        <title>Receipt Box</title>
        <meta name='description' content='Receipt Box' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='main'>
        <div className='main__header'>
          <h1 className='main__header__title'>나의 영수증 보관함</h1>
          <button className='main__header__setting-button'>설정</button>
        </div>
        <div className='main__receipt-list'>
          <div className='main__receipt'>
            <img src='' alt='영수증 이미지' />
            <div>description</div>
          </div>
        </div>
      </main>
    </Container>
  );
}

const Container = styled.div`
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .main__header {
    width: 100%;
  }

  .main__receipt-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    background: var(--grey100);
  }

  .main__receipt {
    display: flex;
  }
`;
