export default function Section2Mobile() {
  return (
    <section className="my-20 flex w-full min-w-[300px] flex-wrap justify-center">
      <div className="-mb-[9.5rem] h-256 w-full bg-pink-0">
        <div className="mx-auto mb-10 w-200 pt-32">
          <div className="relative h-0 w-200">
            <div className="absolute top-20 left-0 z-0 h-28 w-190 rounded-5 bg-pink-3"></div>
          </div>
          <div className="relative z-10 mb-20 text-center">
            <span className="text-28 font-semibold text-red-3">NFT</span>
            <span className="mx-8 text-22 font-medium">헌혈증서</span>
          </div>
        </div>
      </div>
      <img src="mainItems/nftCard.svg" alt="nftCard" className="w-300" />
      <img
        src="mainItems/mainNFTInfo.svg"
        alt="mainNFTInfo"
        className="mt-30 w-224"
      />
    </section>
  );
}
