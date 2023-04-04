import { FaCameraRetro } from "react-icons/fa";

interface Iprops {
  width: number;
  height: number;
  fontSize: number;
  children: string;
  onClick: () => void;
}

export default function InstaBtn({
  width,
  height,
  fontSize,
  children,
  onClick,
}: Iprops) {
  return (
    <button
      className="flex h-45 items-center justify-center gap-10 rounded-10 border-3 border-red-2 bg-white font-semibold leading-20 text-red-2 hover:bg-red-2 hover:text-white"
      css={[
        {
          width: width,
          height: height,
          fontSize: fontSize,
        },
      ]}
      onClick={onClick}
    >
      {/* <img
        src="/icons/instagram.png"
        css={[
          {
            width: height - 10,
            height: height - 10,
          },
        ]}
      /> */}
      <FaCameraRetro
        css={[
          {
            width: height - 10,
            height: height - 10,
          },
        ]}
      />
      {children}
    </button>
  );
}
