import tw from 'twin.macro'

interface Iprops {
  width: number
  height: number
  fontSize: number
  children: string
  onClick: () => void
}

export default function MoveBtn({ width, height, children, fontSize, onClick }: Iprops) {
  return (
    <button
      css={[
        tw`flex items-center justify-center font-semibold text-white leading-20 rounded-30 bg-red-1`,
        {
          width: width,
          height: height,
          fontSize: fontSize
        },
      ]}
      onClick={onClick}
    >
      {children}
      <img src="/icons/front-white.png" css={[

        tw`ml-15`,
        {
          width: height - 18,
          height: height - 18
        }
      ]} />
    </button>
  )
}