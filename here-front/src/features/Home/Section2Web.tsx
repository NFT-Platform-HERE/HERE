export default function Section2Web() {
  return (
    <section className="my-99 mx-auto flex w-[75rem] justify-center mobile:w-0">
      <div className="mx-20 flex w-440 flex-col items-center">
        <div className="relative h-0 w-200">
          <div className="absolute top-20 left-0 z-0 h-28 w-190 rounded-5 bg-pink-3"></div>
        </div>
        <div className="z-10 mb-20">
          <span className="text-30 font-semibold text-red-3">NFT</span>
          <span className="mx-8 text-24 font-medium">헌혈증서</span>
        </div>
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
  );
}
