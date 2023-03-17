import Footer from "@/components/Footer/Footer";
import Section2Mobile from "@/features/Home/Section2Mobile";
import Section2Web from "@/features/Home/Section2Web";
import React, { useState, useEffect } from "react";

export default function HomePage() {
  return (
    <div>
      <div className="aspect-[3.2/1] w-full min-w-[1200px] bg-[url('/banners/mainBanner.png')] bg-contain bg-no-repeat mobile:aspect-[1.15/1] mobile:w-full mobile:min-w-[300px] mobile:bg-[url('/banners/mainBannerMobile.png')]"></div>
      <section className="my-80 min-w-[1200px] mobile:my-50 mobile:w-full mobile:min-w-[300px]">
        <img
          src="mainItems/mainTitle1.png"
          alt="mainTitle1"
          className="mx-auto w-400"
        />
        <div className="my-30 flex flex-wrap justify-center">
          <div className="mx-5 inline-block aspect-[1/1.34] w-280 bg-[url('/mainItems/mainInfoWeb1.png')] bg-contain bg-no-repeat mobile:my-10 mobile:aspect-[1.3/1] mobile:bg-[url('/mainItems/mainInfoMobile1.png')]"></div>
          <div className="mx-5 inline-block aspect-[1/1.34] w-280 bg-[url('/mainItems/mainInfoWeb2.png')] bg-contain bg-no-repeat mobile:my-10 mobile:aspect-[1.3/1] mobile:bg-[url('/mainItems/mainInfoMobile2.png')]"></div>
          <div className="mx-5 inline-block aspect-[1/1.34] w-280 bg-[url('/mainItems/mainInfoWeb3.png')] bg-contain bg-no-repeat mobile:my-10 mobile:aspect-[1.3/1] mobile:bg-[url('/mainItems/mainInfoMobile3.png')]"></div>
          <div className="mx-5 inline-block aspect-[1/1.34] w-280 bg-[url('/mainItems/mainInfoWeb4.png')] bg-contain bg-no-repeat mobile:my-10 mobile:aspect-[1.3/1] mobile:bg-[url('/mainItems/mainInfoMobile4.png')]"></div>
        </div>
      </section>

      <img
        src="mainItems/mainWave.png"
        alt="mainWave"
        className="mx-auto w-[75rem] min-w-[75rem] mobile:hidden"
      />

      <div className="hidden mobile:block">
        <Section2Mobile />
      </div>
      <div className="mobile:hidden">
        <Section2Web />
      </div>

      <section className="my-80 flex min-w-[1200px] justify-center bg-pink-0 py-80 mobile:my-50 mobile:w-full mobile:min-w-[300px]">
        <img
          src="mainItems/mainTitle3.png"
          alt="mainTitle3"
          className="my-auto inline-block h-160 w-200 mobile:ml-8 mobile:h-100 mobile:w-125"
        />
        {/* <img src={BDimg} alt="BDimg" className="inline-block h-500 w-800"/> */}
        <div className="inline-block h-500 w-800 bg-stone-400">
          헌혈 이미지 들어감
        </div>
      </section>

      <section className="mb-90 min-w-[1200px] mobile:w-full mobile:min-w-[300px]">
        <img
          src="mainItems/mainTitle4.png"
          alt="mainTitle4"
          className="mx-auto w-400 mobile:w-300"
        />
        <div className="my-50 flex flex-wrap justify-center">
          <img
            src="mainItems/mainBottom1.png"
            alt="mainBottom1"
            className="my-auto inline-block h-300 w-300 mobile:h-250 mobile:w-250"
          />
          <img
            src="mainItems/mainBottom2.png"
            alt="mainBottom2"
            className="z-10 mx-40 inline-block w-350 mobile:-my-35 mobile:h-280 mobile:w-280"
          />
          <img
            src="mainItems/mainBottom3.png"
            alt="mainBottom3"
            className="my-auto inline-block w-300 mobile:h-250 mobile:w-250"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}
