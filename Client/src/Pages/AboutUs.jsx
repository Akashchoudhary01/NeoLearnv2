import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import AboutImg from "../assets/Images/aboutMainImage.png";
import Carousel from "../Layout/Carousel.jsx";
import { CelebrityData } from "../Constants/CelebrityData.js";

const AboutUs = () => {
  return (
    <HomeLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-10 lg:py-16 bg-base-100 text-base-content transition-colors duration-300">
        
        {/* Top Section */}
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Affordable & Quality Learning
            </h1>

            <p className="text-base-content/80 text-base sm:text-lg leading-relaxed">
              NeoLearn is a thoughtfully designed learning platform that
              brings high-quality courses together in one place. With
              structured content and easy navigation, it helps you build
              skills at your own pace.
            </p>

            <p className="text-base-content/80 text-base sm:text-lg leading-relaxed">
              With a balance of clarity and practical exposure, NeoLearn
              is built for learners who value consistency and real
              progress. Learn from industry experts and gain practical
              knowledge that helps you grow professionally.
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={AboutImg}
              alt="About NeoLearn"
              className="w-full max-w-xs sm:max-w-md lg:max-w-lg drop-shadow-2xl rounded-lg"
            />
          </div>
        </div>

        {/* Student Testimonials Section */}
      <div className="mt-16 lg:mt-24">
          <div className="max-w-5xl mx-auto">
            {/* FIX: Use bg-base-200 and text-base-content */}
            <div className="carousel w-full rounded-xl overflow-hidden bg-base-200 text-base-content">
              {CelebrityData &&
                CelebrityData.map((celebrity) => (
                  <Carousel
                    {...celebrity}
                    key={celebrity.slideNumber}
                    totalSlide={CelebrityData.length}
                  />
                ))}
            </div>
          </div>
        </div>

      </div>
    </HomeLayout>
  );
};

export default AboutUs;