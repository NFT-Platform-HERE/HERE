import Footer from "@/components/Footer/Footer";
import React from 'react'
import CommonBtn from '@/components/Button/CommonBtn'
import CheerBtn from '@/components/Button/CheerBtn'

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

      <section className="my-99 flex justify-center flex-wrap">
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
      </section>

      <section className="bg-pink-0 my-80 flex justify-center py-80">
        <img
          src="mainItems/mainTitle3.png"
          alt="mainTitle3"
          className="my-auto inline-block h-160 w-200 mobile:h-100 mobile:w-125 mobile:ml-8"
        />
        <div className="bg-stone-400 inline-block h-500 w-800">
          헌혈 이미지 들어감
        </div>
      </section>

      <section className="mb-90">
        <img
          src="mainItems/mainTitle4.png"
          alt="mainTitle4"
          className="mx-auto w-400 mobile:w-300"
        />
        <div className="my-50 flex flex-wrap justify-center">
          <img
            src="mainItems/mainBottom1.png"
            alt="mainBottom1"
            className="my-auto inline-block h-300 w-300 mobile:w-250 mobile:h-250"
          />
          <img
            src="mainItems/mainBottom2.png"
            alt="mainBottom2"
            className="mx-40 inline-block w-350 mobile:w-280 mobile:h-280 mobile:-my-35 z-10"
          />
          <img
            src="mainItems/mainBottom3.png"
            alt="mainBottom3"
            className="my-auto inline-block w-300 mobile:w-250 mobile:h-250"
          />
        </div>
      </section>
      <Footer />
      {/* <CheerBtn width={200} height={50} count={5} imgUrl={'/next.svg'} onClick={() => console.log('click!')}>응원해요</CheerBtn>
      <div className='flex flex-wrap w-full gap-20 p-20'>
        <img src="/NFT_bg_1.gif" className="w-200 aspect-[1/1.618] rounded-20 object-cover"></img>
        <img src="/NFT_bg_2.gif" className="w-200 aspect-[1/1.618] rounded-20 object-cover"></img>
        <img src="/NFT_bg_3.gif" className="w-200 aspect-[1/1.618] rounded-20 object-cover"></img>
        <img src="/NFT_bg_4.gif" className="w-200 aspect-[1/1.618] rounded-20 object-cover"></img>
        <img src="/NFT_bg_5.gif" className="w-200 aspect-[1/1.618] rounded-20 object-cover"></img>
        <img src="/NFT_bg_6.gif" className="w-200 aspect-[1/1.618] rounded-20 object-cover"></img>
        <img src="/NFT_bg_7.gif" className="w-200 aspect-[1/1.618] rounded-20 object-cover"></img>
        <img src="/NFT_bg_8.gif" className="w-200 aspect-[1/1.618] rounded-20 object-cover"></img>
        <img src="/NFT_bg_9.gif" className="w-200 aspect-[1/1.618] rounded-20 object-cover"></img>
        <img src="/NFT_bg_10.gif" className="w-200 aspect-[1/1.618] rounded-20 object-cover"></img>
        <img src="/NFT_bg_11.gif" className="w-200 aspect-[1/1.618] rounded-20 object-cover"></img>
        <img src="/NFT_bg_12.gif" className="w-200 aspect-[1/1.618] rounded-20 object-cover"></img>
        <img src="/NFT_bg_13.gif" className="w-200 aspect-[1/1.618] rounded-20 object-cover"></img>
      </div> */}
    </div>
  );
}
