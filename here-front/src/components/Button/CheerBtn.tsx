import tw from 'twin.macro'

interface Iprops {
  width: number
  height: number
  fontSize: number
  count: number
  imgUrl: string
  children: string
  onClick: () => void
}

export default function CheerBtn({ width, height, fontSize, count, imgUrl, children, onClick }: Iprops) {
  return (
    <button
      css={[
        tw`flex items-center justify-between font-medium text-white px-18 bg-red-1 rounded-50 hover:text-red-3`,
        {
          width: width,
          height: height,
          fontSize: fontSize
        },
      ]}
      onClick={onClick}
    >
      <div className='flex items-center'><img src={imgUrl} className='mr-6 w-30 h-30'></img>{children}</div> {count}명
    </button>
  )
}