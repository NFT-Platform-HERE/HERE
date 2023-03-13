import Footer from "@/components/Footer/Footer";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <h1 className="py-20">헤더 자리...</h1>
      <div className="aspect-[3.2/1] w-full bg-[url('/banners/mainBanner.png')] bg-contain bg-no-repeat mobile:aspect-[1.15/1] mobile:bg-[url('/banners/mainBannerMobile.png')]"></div>
      <section className="my-80">
        <img
          src="mainItems/mainTitle1.png"
          alt="mainTitle1"
          className="mx-auto w-400 mobile:w-300"
        />
        <div className="my-30 flex flex-wrap justify-center">
          <div className="mx-5 inline-block aspect-[1/1.34] w-300 bg-[url('/mainItems/mainInfoWeb1.png')] bg-contain bg-no-repeat mobile:my-10 mobile:aspect-[1.3/1] mobile:bg-[url('/mainItems/mainInfoMobile1.png')]"></div>
          <div className="mx-5 inline-block aspect-[1/1.34] w-300 bg-[url('/mainItems/mainInfoWeb2.png')] bg-contain bg-no-repeat mobile:my-10 mobile:aspect-[1.3/1] mobile:bg-[url('/mainItems/mainInfoMobile2.png')]"></div>
          <div className="mx-5 inline-block aspect-[1/1.34] w-300 bg-[url('/mainItems/mainInfoWeb3.png')] bg-contain bg-no-repeat mobile:my-10 mobile:aspect-[1.3/1] mobile:bg-[url('/mainItems/mainInfoMobile3.png')]"></div>
          <div className="mx-5 inline-block aspect-[1/1.34] w-300 bg-[url('/mainItems/mainInfoWeb4.png')] bg-contain bg-no-repeat mobile:my-10 mobile:aspect-[1.3/1] mobile:bg-[url('/mainItems/mainInfoMobile4.png')]"></div>
        </div>
      </section>

      <img
        src="mainItems/mainWave.png"
        alt="mainWave"
        className="mx-auto w-[77rem] mobile:hidden"
      />
      <div className="my-99 flex justify-center">
        <div className="mx-20 flex w-440 flex-col items-center">
          <img
            src="mainItems/mainTitle2.png"
            alt="mainTitle2"
            className="mb-10 w-200"
          />
          <img
            src="mainItems/mainNFTInfo.png"
            alt="mainNFTInfo"
            className="w-320"
          />
        </div>
        <div className="mx-20">
          <img src="mainItems/mainNFT.png" alt="mainNFT" className="w-440" />
        </div>
      </div>
      <div className="my-80 flex justify-center bg-red-100 py-80">
        <img
          src="mainItems/mainTitle3.png"
          alt="mainTitle3"
          className="my-auto inline-block h-160 w-200 mobile:h-100 mobile:w-125"
        />
        <div className="inline-block h-500 w-800 bg-stone-400">
          헌혈 이미지 들어감
        </div>
      </div>
      <div className="mb-90">
        <img
          src="mainItems/mainTitle4.png"
          alt="mainTitle4"
          className="mx-auto w-400 mobile:w-300"
        />
        <div className="my-50 flex flex-wrap justify-center">
          <img
            src="mainItems/mainBottom1.png"
            alt="mainBottom1"
            className="my-auto inline-block h-300 w-300"
          />
          <img
            src="mainItems/mainBottom2.png"
            alt="mainBottom2"
            className="mx-40 inline-block w-350"
          />
          <img
            src="mainItems/mainBottom3.png"
            alt="mainBottom3"
            className="my-auto inline-block w-300"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
