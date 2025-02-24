import React from "react";
import StudentImage from "../../../assets/images/student.png";
import { Link } from "react-router-dom";
import Button from "../../layout/Button";


const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-black">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-5 pt-32 sm:pt-40 lg:pt-56">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <div className="flex-1 text-white max-w-full lg:max-w-[594px] text-center lg:text-left">
            <h1 className="font-nunito font-bold text-[28px] sm:text-[32px] lg:text-[36px] leading-tight sm:leading-[40px] lg:leading-[44px] mb-4 sm:mb-6">
              Get engaged to learning!
            </h1>

            <p className="font-nunito font-normal text-[18px] sm:text-[20px] lg:text-[24px] leading-[28px] sm:leading-[30px] lg:leading-[32px] mb-8 sm:mb-12 text-white/90 px-4 sm:px-0">
              Take an interactive Physics quiz with AI as your mentor.
              <span className="hidden lg:inline">
                <br />
              </span>
              <span className="lg:hidden"> </span>
            </p>

            <Link to={"/select-mentor"}>
            <Button variant="primary" handleClick={()=>{}} loading={false} className="w-[283px] h-[67px] text-2xl">Take the Quiz NOW!</Button>
            </Link>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end w-full px-4 sm:px-0 mb-8 lg:mb-0">
            <img
              src={StudentImage}
              alt="Students Learning Physics"
              className="w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[594px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
