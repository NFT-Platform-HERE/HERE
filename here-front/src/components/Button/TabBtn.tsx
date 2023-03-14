import tw from 'twin.macro'

interface Iprops {
  width: number
  height: number
  fontSize: number
  isSelected: boolean
  children: string
  onClick: () => void
}

export default function TabBtn({ width, height, fontSize, isSelected, children, onClick }: Iprops) {
  return (
    <button
      css={[
        isSelected ? tw`font-medium leading-20 border-1 border-red-2 text-red-2` : tw`font-medium leading-20 border-1 border-pen-0`,
        {
          width: width,
          height: height,
          fontSize: fontSize
        },
      ]}
      onClick={onClick}
    >
      {children}
    </button>
  )
}