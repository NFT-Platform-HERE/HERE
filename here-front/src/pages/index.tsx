import Footer from "@/components/Footer/Footer";
import Section1 from "@/features/Home/Section1";
import Section2Mobile from "@/features/Home/Section2Mobile";
import Section2Web from "@/features/Home/Section2Web";
import Section3 from "@/features/Home/Section3";
import Section4 from "@/features/Home/Section4";
import React, { useState, useEffect } from "react";

export default function HomePage() {
  return (
    <div>
      <div className="aspect-[3.2/1] w-full min-w-[1200px] bg-[url('/banners/mainBanner.png')] bg-contain bg-no-repeat mobile:aspect-[1.15/1] mobile:w-full mobile:min-w-[300px] mobile:bg-[url('/banners/mainBannerMobile.png')]"></div>
      <Section1 />

      <img
        src="mainItems/mainWave.png"
        alt="mainWave"
        className="mx-auto w-[75rem] min-w-[75rem] animate-wave mobile:hidden"
      />

      <div className="hidden mobile:block">
        <Section2Mobile />
      </div>
      <div className="mobile:hidden">
        <Section2Web />
      </div>
      <Section3 />

      <Section4 />
      <Footer />
    </div>
  );
}
