import { HiOutlineArrowSmRight } from "react-icons/hi";

export default function InfoFirstMobile() {
  return (
    <>
      <div className="relative mx-auto h-0 w-200">
        <div className="absolute top-12 left-24 z-0 h-28 w-150 rounded-5 bg-pink-3"></div>
      </div>
      <div className="relative z-10 mb-20">
        <span className="text-20 font-semibold ">로그인 방법</span>
      </div>
      <div className="mx-10 flex items-center justify-center rounded-30 border-5 border-pink-2 py-20">
        <img src="info/metamask.png" className="mr-10 inline-block w-100" />
        <div className="inline-block text-start text-15">
          <p>
            <strong>메타마스크</strong> 계정으로
          </p>
          <p className="mb-10">로그인이 가능해요</p>
          <div className="text-13 text-red-2">
            <HiOutlineArrowSmRight className="mr-5 inline-block" />
            <a href="https://www.notion.so/MetaMask-3968d4365cb14dba8fd46bee11adaef5">
              지갑 생성하기{" "}
            </a>
          </div>
          <div className="text-13 text-red-2">
            <HiOutlineArrowSmRight className="mr-5 inline-block" />
            <a href="https://amber-romano-e29.notion.site/7e362a7da48c4735ab879e61e587a82f">
              테스트 계정으로 사용하기
            </a>
          </div>
        </div>
      </div>
      <div className="mx-10 my-10  rounded-30 border-5 border-pink-2 pt-10 pb-20">
        <img src="info/ssafy.png" className=" mx-auto w-160" />
        <div className="inline-block break-all px-10 text-15">
          <p className="mb-5">
            HE:RE는 <strong>SSAFY 네트워크</strong>를 사용합니다
          </p>
          <p>
            SSAFY 네트워크에 연결되어 있지 않아도 <strong>HE:RE</strong>가
            연결해줄게요😋
          </p>
        </div>
      </div>
      <div className="mx-10 mb-50 rounded-30 border-5 border-pink-2 py-30">
        <img src="info/memberInfoInput.png" className="mb-20 w-full" />
        <div>
          <p className="mb-20">
            최초 1회 <strong>회원정보입력</strong>이 필요해요
          </p>
          <p>그 이후에는 메타마스크 지갑 연결만으로도</p>
          <p>
            <strong>손쉬운 로그인</strong>이 가능하답니다
          </p>
        </div>
      </div>
    </>
  );
}
