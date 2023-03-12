import React from 'react'
import CommonBtn from '@/components/Button/CommonBtn'

export default function HomePage() {
  return (
    <div>
      <CommonBtn width={200} height={70} onClick={ () => console.log('click!') }> Button</CommonBtn>
    </div>
  )
}
