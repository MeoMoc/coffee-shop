import SwiperComponent from "../../../components/common/swiper/Swiper";
import { SwiperSlide } from "swiper/react";

const slides = [
  { id: 1, image: "/images/home-slide-1.webp" },
  { id: 2, image: "/images/home-slide-2.webp" },
  { id: 3, image: "/images/home-slide-3.webp" },
];

const Banner = () => {
  return (
    <SwiperComponent showNavigation={false}>
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="banner-item"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        </SwiperSlide>
      ))}
    </SwiperComponent>
  );
};

export default Banner;
