import React from 'react'
import CommonBtn from '@/components/Button/CommonBtn'
import CheerBtn from '@/components/Button/CheerBtn'

export default function HomePage() {
  return (
    <div>
      <CheerBtn width={200} height={50} count={5} imgUrl={'/next.svg'} onClick={() => console.log('click!')}>응원해요</CheerBtn>
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
      </div>

    </div>
  )
}
