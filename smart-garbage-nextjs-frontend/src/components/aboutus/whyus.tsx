"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const About = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    autoplay: true,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplaySpeed: 2000,
    cssEase: "linear",
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="">
        <div className="text-2xl text-center font-semibold py-4">
          How we work
        </div>
        {/* <Slider {...settings}>
          <div className="flex items-center justify-center w-full h-[60vh] max-sm:h-[50vh]">
            <div className="flex items-center justify-center w-full h-full">
              <Image
                src="/images/slider1.jpg"
                alt="earth"
                width={300}
                height={200}
                className=" w-full h-full object-contain max-md:object-contain"
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-[60vh] max-sm:h-[50vh]">
            <div className="flex items-center justify-center w-full h-full">
              <Image
                src="/images/slider.jpg"
                alt="earth"
                width={300}
                height={200}
                className=" w-full h-full object-contain max-md:object-contain"
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-[60vh] max-sm:h-[50vh]">
            <div className="flex items-center justify-center w-full h-full">
              <Image
                src="/images/slider3.jpeg"
                alt="earth"
                width={300}
                height={200}
                className=" w-full h-full object-contain max-md:object-contain"
              />
            </div>
          </div>
        </Slider> */}

        <Slider {...settings}>
          <div className="flex items-center justify-center w-full h-full">
            <Image
              src="/images/Slider3.jpeg"
              alt="slider_1"
              width={500}
              height={200}
              className="w-full h-full p-2 outline-none"
            />
          </div>
          <div className="flex items-center justify-center w-full h-full">
            <Image
              src="/images/Slider.jpg"
              alt="slider_2"
              width={500}
              height={200}
              className="w-full h-full p-2 outline-none"
            />
          </div>
          {/* <div>
            <Image
              src="/images/Slider2.jpg"
              alt="slider_3"
              width={500}
              height={200}
              className="w-full"
            />
          </div> */}
          <div className="flex items-center justify-center w-full h-full">
            <Image
              src="/images/Slider1.jpg"
              alt="slider_4"
              width={500}
              height={200}
              className="w-full h-full p-2 outline-none"
            />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default About;
