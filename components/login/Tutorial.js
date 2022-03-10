import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';

const Tutorial = ({ className }) => {
  return (
    <Container className={className}>
      <Swiper slidesPerView={1}>
        <SwiperSlide>
          <img src='/tutorial_1.jpg' alt='tutorial1' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='/tutorial_2.jpg' alt='tutorial2' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='/tutorial_3.jpg' alt='tutorial3' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='/tutorial_4.jpg' alt='tutorial4' />
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default Tutorial;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
