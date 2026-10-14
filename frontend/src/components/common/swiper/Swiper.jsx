import { Swiper } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperComponent = ({
  children,
  showPagination = true,
  showNavigation = true,
  ...props
}) => {
  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={showNavigation}
        pagination={showPagination ? { clickable: true } : false}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1000}
        className="swiper-wrapper"
        {...props}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
