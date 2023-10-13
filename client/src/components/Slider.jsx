import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import { SliderCard } from "../components";
const Slider = () => {
  const products = useSelector((state) => state.products);
  const [biryani, setBiryani] = useState(null);
  const [curry, setCurry] = useState([]);
  useEffect(() => {
    setCurry(products?.filter((data) => data.product_category === "curry"));
    console.log(curry);
  }, [products]);

  return (
    <div className="w-full pt-10">
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
      >
        {curry &&
          curry.map((data, i) => (
            <SwiperSlide key={i}>
              <SliderCard key={i} data={data} index={i} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
