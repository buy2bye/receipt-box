import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Tutorial from '../components/login/Tutorial';
import WrapAuthPage from 'helpers/AuthWrapper';

const Home = () => {
  // 영수증 정보 유무에 따라 렌더링 분기 필요

  return (
    <Container>
      <Head>
        <title>Receipt Box</title>
        <meta name='description' content='Receipt Box' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='main'>나의 영수증 보관함</main>
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
`;

export default WrapAuthPage(Home)
