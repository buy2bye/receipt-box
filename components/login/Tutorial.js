import styled from '@emotion/styled';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Tutorial = ({ className }) => {
  return (
    <Container className={className}>
      <Swiper
        pagination modules={[Pagination]}
        slidesPerView={1}
        navigation
      >
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

  .swiper-slide img {
    object-fit: contain;
  }

  .swiper {
    width: 100%;
    height: 100%;
    padding-bottom: 32px;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .swiper-pagination-bullet {
    background: var(--grey600);
  }

  .swiper-pagination-bullet-active {
    background: var(--grey900);
  }
`;
