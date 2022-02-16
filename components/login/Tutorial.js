import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';

const Tutorial = ({ className }) => {
  return (
    <Container className={className}>
      <Swiper slidesPerView={1}>
        <SwiperSlide>Tutorial Slide 1</SwiperSlide>
        <SwiperSlide>Tutorial Slide 2</SwiperSlide>
        <SwiperSlide>Tutorial Slide 3</SwiperSlide>
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