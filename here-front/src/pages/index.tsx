import React from 'react'
import CommonBtn from '@/components/Button/CommonBtn'
import CheerBtn from '@/components/Button/CheerBtn'
import InstaBtn from '@/components/Button/InstaBtn'
import MoveBtn from '@/components/Button/MoveBtn'
import TabBtn from '@/components/Button/TabBtn'

export default function HomePage() {
  return (
    <div>
      <div className='flex w-[1440px] h-100'>
        <TabBtn width={720} height={100} fontSize={24} isSelected={false} onClick={() => console.log('click!')}>기관 제출용(인증)</TabBtn>
        <TabBtn width={720} height={100} fontSize={24} isSelected={true} onClick={() => console.log('click!')}>병원 제출용(수납)</TabBtn>
      </div>

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
  )
}
