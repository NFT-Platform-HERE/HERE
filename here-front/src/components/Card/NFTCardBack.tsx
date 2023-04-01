import { NFTDetail } from "@/types/NFTDetail";
import { BloodType, GenderType, RhType } from "@/enum/statusType";

interface Iprops {
  height: number;
  fontSize: number;
  detail: NFTDetail;
}

export default function NFTCardBack({ height, fontSize, detail }: Iprops) {
  return (
    <div
      id="back-capture"
      className="relative overflow-hidden rounded-20 bg-white shadow-lg"
      css={[
        {
          width: height * 1.618,
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
                width: ((height * 1.618 - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            성명
          </div>
          <div
            css={[
              {
                width: ((height * 1.618 - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            {detail?.name}
          </div>

          <div
            css={[
              {
                width: ((height * 1.618 - 40) * 1) / 2,
                height: (height * 1) / 10,
              },
            ]}
          ></div>
        </div>
        <div className="flex">
          <div
            css={[
              {
                width: ((height * 1.618 - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            생년월일
          </div>
          <div
            css={[
              {
                width: ((height * 1.618 - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            {detail?.birth}
          </div>

          <div
            css={[
              {
                width: ((height * 1.618 - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            성별
          </div>
          <div
            css={[
              {
                width: ((height * 1.618 - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            {detail?.gender === GenderType.MALE && "남"}
            {detail?.gender === GenderType.FEMALE && "여"}
          </div>
        </div>
        <table
          className="border-separate border-spacing-0 overflow-hidden rounded-10 border-1 border-black text-center"
          css={[
            {
              width: height * 1.618 - 40,
              height: (height * 2) / 7,
              fontSize: fontSize - 2,
            },
          ]}
        >
          <tbody>
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
              <td className="border-r-1 border-black">{detail?.blood}</td>
              <td className="border-r-1 border-black">
                {detail?.rhType === RhType.RHPLUS ? "Rh+" : "Rh-"}
              </td>
              <td className="border-r-1 border-black">
                {detail?.type === BloodType.WHOLE && "O"}
              </td>
              <td className="border-r-1 border-black">
                {detail?.type === BloodType.PLATELET && "O"}
              </td>
              <td className="border-r-1 border-black">
                {detail?.type === BloodType.PLASMA && "O"}
              </td>
              <td>{detail?.bloodAmount}mL</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6 flex">
          <div
            css={[
              {
                width: ((height * 1.618 - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            헌혈일자
          </div>
          <div
            css={[
              {
                width: ((height * 1.618 - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            {detail?.createdDate}
          </div>

          <div
            css={[
              {
                width: ((height * 1.618 - 40) * 1) / 2,
                height: (height * 1) / 10,
              },
            ]}
          ></div>
        </div>
        <div className="flex">
          <div
            css={[
              {
                width: ((height * 1.618 - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            혈액원명
          </div>
          <div
            css={[
              {
                width: ((height * 1.618 - 40) * 2) / 4,
                height: (height * 1) / 10,
              },
            ]}
          >
            {detail?.place}
          </div>

          <div
            css={[
              {
                width: ((height * 1.618 - 40) * 1) / 4,
                height: (height * 1) / 10,
              },
            ]}
          ></div>
        </div>

        <img
          src="/icons/redcross-stamp.svg"
          className="absolute bottom-0 -right-25"
          css={[
            {
              width: height * 1.618 * 0.5,
              height: height * 0.2,
            },
          ]}
        ></img>
      </div>
    </div>
  );
}
