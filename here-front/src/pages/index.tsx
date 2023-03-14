import React from "react";
import CommonBtn from "@/components/Button/CommonBtn";
import CheerBtn from "@/components/Button/CheerBtn";
import InstaBtn from "@/components/Button/InstaBtn";
import MoveBtn from "@/components/Button/MoveBtn";
import TabBtn from "@/components/Button/TabBtn";
import CommonBar from "@/components/Bar/CommonBar";
import HeartBar from "@/components/Bar/HeartBar";
import HeaderTag from "@/components/Tag/HeaderTag";

export default function HomePage() {
  return (
    <div>
      <HeaderTag>#헌혈증서 #나눔</HeaderTag>
      {/* <HeartBar width={400} height={7} fontSize={13} percent={100}></HeartBar> */}
      {/* <TabBtn width={200} height={50} fontSize={18} onClick={() => console.log('click')} isSelected={false}>SNS 바로가기</TabBtn> */}
      {/* <InstaBtn width={200} height={50} fontSize={18} onClick={() => console.log('click')}>SNS 바로가기</InstaBtn> */}
      {/* <div className='flex flex-wrap w-full gap-20 p-20'>
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
