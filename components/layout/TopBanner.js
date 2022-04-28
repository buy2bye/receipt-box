import styled from '@emotion/styled';
import Image from 'next/image';

const TopBanner = () => {
  // TODO: display 분기 및 랜딩 url 분기
  return (
    <Container>
      <Image
        layout='fill'
        objectFit='contain'
        src='/banner/app-landing-banner.png'
        alt='app-landing-banner'
      />
    </Container>
  );
};

export default TopBanner;

const Container = styled.div`
  width: 100vw;
  height: 12.5vw;
  min-height: 12.5vw;
  position: relative;
`;
