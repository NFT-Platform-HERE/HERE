interface Iprops {
  width: number;
  imgUrl: string;
}

export default function NFTCardFront({ width, imgUrl }: Iprops) {
  return (
    <div
      id="front-capture"
      className="relative overflow-hidden rounded-20 shadow-lg"
      css={[
        {
          width: width,
          height: width * 1.618,
        },
      ]}
    >
      <img
        src={imgUrl}
        className="object-cover"
        css={[
          {
            width: width,
            height: width * 1.618,
          },
        ]}
      />

      <img
        src="/icons/redcross-emblem.svg"
        className="absolute"
        css={[
          {
            width: width * 0.217,
            height: width * 0.217,
            top: 0.05 * width,
            right: 0.05 * width,
          },
        ]}
      />
    </div>
  );
}
