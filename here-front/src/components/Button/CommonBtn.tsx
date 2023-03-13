import tw from 'twin.macro'

interface Iprops {
  width: number
  height: number
  children: string
  onClick: () => void
}

export default function CommonBtn({ width, height, onClick, children }: Iprops) {
  return (
    <button
      css={[
        tw`font-semibold leading-20 border-red-2 border-3 rounded-20 text-red-2 text-22 hover:bg-red-2 hover:text-white disabled:border-red-0 disabled:text-red-0`,
        {
          width: width,
          height: height,
        },
      ]}
      onClick={onClick}
    >
      {children}
    </button>
  )
}