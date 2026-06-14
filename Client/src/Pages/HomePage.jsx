import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import { Link } from "react-router-dom";
import mainImage from "../assets/Images/main-image.png";
import mainimage2 from "../assets/Images/home2.png";
import AboutImg from "../assets/Images/aboutMainImage.png";
import Carousel from "../Layout/Carousel.jsx";
// import {  } from "../Constants/CelebrityData.js";
import {StudentData} from '../Constants/StudentData.js'

const HomePage = () => {
  return (
    <HomeLayout>
      {/* Hero Section */}
      <div className="min-h-[90vh] bg-base-100 text-base-content transition-colors duration-300">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 px-6 lg:px-16 py-16">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Find Our Best{" "}
              <span className="text-primary">Online Courses</span>
            </h1>

            <p className="text-lg md:text-xl text-base-content/80">
              We have a large library of online courses taught by highly
              skilled and qualified faculty at a very{" "}
              <span className="italic text-secondary">
                affordable cost
              </span>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/courses">
                <button className="btn btn-primary shadow-lg hover:scale-105 transition-all duration-300">
                  Explore Courses
                </button>
              </Link>

              <Link to="/contact">
                <button className="btn btn-secondary shadow-lg hover:scale-105 transition-all duration-300">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={mainImage}
              alt="Online Learning"
              className="w-full max-w-md lg:max-w-xl drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="px-6 bg-base-200 lg:px-16 py-20 text-base-content transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={mainimage2}
              alt="About NeoLearn"
              className="w-full max-w-md lg:max-w-lg drop-shadow-2xl"
            />
          </div>
          
          {/* About Text */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold">
              Your Future Starts Here
            </h2>

            <p className="text-base-content/80 text-lg leading-relaxed">
              Discover courses that help you build valuable skills, advance your
              career, and stay ahead in a rapidly changing world. Learn anytime,
              anywhere, at your own pace.
            </p>

            <p className="text-base-content/80 text-lg leading-relaxed">
              From technology and business to personal development, our learning
              platform offers high-quality content created by industry experts to
              help you achieve your goals with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 lg:px-16 bg-base-100 text-base-content transition-colors duration-300">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-base-200 rounded-xl p-6 text-center shadow-lg">
            <h3 className="text-4xl font-bold text-primary">100+</h3>
            <p className="mt-2">Courses</p>
          </div>

          <div className="bg-base-200 rounded-xl p-6 text-center shadow-lg">
            <h3 className="text-4xl font-bold text-secondary">10K+</h3>
            <p className="mt-2">Students</p>
          </div>

          <div className="bg-base-200 rounded-xl p-6 text-center shadow-lg">
            <h3 className="text-4xl font-bold text-accent">50+</h3>
            <p className="mt-2">Instructors</p>
          </div>

          <div className="bg-base-200 rounded-xl p-6 text-center shadow-lg">
            <h3 className="text-4xl font-bold text-success">95%</h3>
            <p className="mt-2">Success Rate</p>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="px-6 lg:px-16 py-20 bg-base-200 text-base-content transition-colors duration-300">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h2 className="text-4xl font-bold">
            What Our Learners Say
          </h2>
          <p className="text-base-content/70 mt-4">
            Hear from students and industry experts who trust NeoLearn.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="carousel w-full rounded-xl overflow-hidden">
            {StudentData &&
              StudentData.map((celebrity) => (
                <Carousel
                  key={celebrity.slideNumber}
                  {...celebrity}
                  totalSlide={StudentData.length}
                />
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-base-100 transition-colors duration-300">
        <div className="max-w-5xl mx-auto bg-neutral text-neutral-content rounded-3xl p-10 text-center shadow-2xl">
          <h2 className="text-4xl font-bold">
            Start Learning Today
          </h2>

          <p className="text-neutral-content/90 mt-4 text-lg">
            Join thousands of students who are already upgrading their
            skills and advancing their careers.
          </p>

          <Link to="/courses">
            <button className="btn btn-primary mt-8">
              Browse Courses
            </button>
          </Link>
        </div>
      </section>
    </HomeLayout>
  );
};

export default HomePage;