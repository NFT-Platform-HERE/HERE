export default function Section1() {
  return (
    <section className="my-80 min-w-[1200px] mobile:my-50 mobile:w-full mobile:min-w-[300px]">
      {/* <img
        src="mainItems/mainTitle1.png"
        alt="mainTitle1"
        className="mx-auto w-400"
      /> */}
      <div className="relative mx-auto h-60 w-500 text-center">
        <img
          src="mainItems/heart.png"
          alt="heart"
          className="absolute left-100 z-0 h-50 w-60"
        />
        <div className="relative z-10">
          <p className="inline-block text-36 font-medium text-red-3 before:content-['HE:RE'] hover:before:content-[''] hover:after:duration-150 hover:after:ease-in-out hover:after:content-['HEART:SHARE']"></p>
          <p className="inline-block text-32 font-medium">에서 할 수 있어요</p>
        </div>
      </div>
      <div className="my-30 flex flex-wrap justify-center">
        <div className="mx-5 inline-block aspect-[1/1.34] w-280 bg-[url('/mainItems/mainInfoWeb1.png')] bg-contain bg-no-repeat mobile:my-10 mobile:aspect-[1.3/1] mobile:bg-[url('/mainItems/mainInfoMobile1.png')]"></div>
        <div className="mx-5 inline-block aspect-[1/1.34] w-280 bg-[url('/mainItems/mainInfoWeb2.png')] bg-contain bg-no-repeat mobile:my-10 mobile:aspect-[1.3/1] mobile:bg-[url('/mainItems/mainInfoMobile2.png')]"></div>
        <div className="mx-5 inline-block aspect-[1/1.34] w-280 bg-[url('/mainItems/mainInfoWeb3.png')] bg-contain bg-no-repeat mobile:my-10 mobile:aspect-[1.3/1] mobile:bg-[url('/mainItems/mainInfoMobile3.png')]"></div>
        <div className="mx-5 inline-block aspect-[1/1.34] w-280 bg-[url('/mainItems/mainInfoWeb4.png')] bg-contain bg-no-repeat mobile:my-10 mobile:aspect-[1.3/1] mobile:bg-[url('/mainItems/mainInfoMobile4.png')]"></div>
      </div>
    </section>
  );
}
