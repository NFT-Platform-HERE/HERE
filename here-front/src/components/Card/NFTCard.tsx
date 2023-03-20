interface Iprops {
  width: number;
  height: number;
  fontSize: number;
}

export default function NFTCard({ width, height, fontSize }: Iprops) {
  return (
    <div
      className="relative overflow-hidden rounded-20 shadow-lg"
      css={[
        {
          width: width,
          height: height,
        },
      ]}
    >
      <div
        className="flex w-full items-center bg-red-3 pl-20 tracking-widest text-white"
        css={[
          {
            height: (height * 3) / 14,
            fontSize: fontSize + 6,
          },
        ]}
      >
        헌혈증서
      </div>
      <div
        className="my-10 flex flex-col items-center justify-center"
        css={[
          {
            fontSize: fontSize,
          },
        ]}
      >
        <div className="flex">
          <div
            css={[
              {
                width: ((width - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            성명
          </div>
          <div
            css={[
              {
                width: ((width - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            이경택
          </div>

          <div
            css={[
              {
                width: ((width - 40) * 1) / 2,
                height: (height * 1) / 10,
              },
            ]}
          ></div>
        </div>
        <div className="flex">
          <div
            css={[
              {
                width: ((width - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            생년월일
          </div>
          <div
            css={[
              {
                width: ((width - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            95.03.08
          </div>

          <div
            css={[
              {
                width: ((width - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            성별
          </div>
          <div
            css={[
              {
                width: ((width - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            남
          </div>
        </div>
        <table
          className="border-separate border-spacing-0 overflow-hidden rounded-10 border-1 border-black text-center"
          css={[
            {
              width: width - 40,
              height: (height * 2) / 7,
              fontSize: fontSize - 2,
            },
          ]}
        >
          <tr>
            <td
              className="border-b-1 border-r-1 border-black bg-red-100"
              rowSpan={2}
              colSpan={2}
            >
              혈액형
            </td>
            <td
              colSpan={3}
              className="border-b-1 border-r-1 border-black bg-purple-100"
            >
              헌혈종류
            </td>
            <td rowSpan={2} className="border-b-1 border-black bg-red-200">
              헌혈량
            </td>
          </tr>
          <tr>
            <td className="border-b-1 border-r-1 border-black bg-purple-100">
              전혈
            </td>
            <td className="border-b-1 border-r-1 border-black bg-purple-100">
              혈장
            </td>
            <td className="border-b-1 border-r-1 border-black bg-purple-100">
              혈소판
            </td>
          </tr>
          <tr>
            <td className="border-r-1 border-black">A</td>
            <td className="border-r-1 border-black">Rh+</td>
            <td className="border-r-1 border-black">O</td>
            <td className="border-r-1 border-black"></td>
            <td className="border-r-1 border-black"></td>
            <td>400mL</td>
          </tr>
        </table>

        <div className="mt-6 flex">
          <div
            css={[
              {
                width: ((width - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            헌혈일자
          </div>
          <div
            css={[
              {
                width: ((width - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            2023.03.06
          </div>

          <div
            css={[
              {
                width: ((width - 40) * 1) / 2,
                height: (height * 1) / 10,
              },
            ]}
          ></div>
        </div>
        <div className="flex">
          <div
            css={[
              {
                width: ((width - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            혈액원명
          </div>
          <div
            css={[
              {
                width: ((width - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            대전 충남혈액원
          </div>

          <div
            css={[
              {
                width: ((width - 40) * 1) / 2,
                height: (height * 1) / 10,
              },
            ]}
          ></div>
        </div>

        <img
          src="/icons/redcross-stamp.svg"
          className="absolute bottom-0 right-0"
        ></img>
      </div>
    </div>
  );
}
