import tw from 'twin.macro'

interface Iprops {
  width: number
  height: number
}

export default function CommonBtn({ width, height }: Iprops) {
  return (
    <div
      css={[
        tw`bg-red-400`,
        {
          width: width,
          height: height,
        },
      ]}
    >
      버튼
    </div>
  )
}