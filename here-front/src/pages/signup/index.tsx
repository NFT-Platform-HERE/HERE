import CommonBtn from "@/components/Button/CommonBtn";
import SignupStep1 from "@/features/SignUp/SignupStep1";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const finishUserInfo = () => {
    if (email.length < 1 && emailRef.current) {
      emailRef.current.focus();
      return;
    }
    if (nickname.length < 2 && nicknameRef.current) {
      nicknameRef.current.focus();
      return;
    }
    // API 확인 후 활성화
    router.push("/");
  };

  return (
    <>
      <div className="h-60 w-full bg-pink-0">헤더자리...</div>
      <div className="mx-auto w-700 text-center mobile:w-full mobile:min-w-[300px]">
        <p className="mx-auto mt-30 inline-block text-28 mobile:hidden">
          회원정보 입력
        </p>
        <img
          src="next.svg"
          alt="logo"
          className="mx-auto mt-10 hidden h-80 w-160 mobile:block"
        />
        <div className="mx-auto mt-50 mobile:mt-0 mobile:w-full">
          <div className="my-20">
            <label
              htmlFor="email"
              className="mr-32 inline-block w-54 text-left text-18 font-light mobile:mr-16"
            >
              이메일
            </label>
            <input
              ref={emailRef}
              value={email}
              onChange={handleEmail}
              placeholder="이메일을 입력해주세요"
              type="email"
              id="email"
              className="h-50 w-360 rounded-30 border-1 border-pen-0 px-24 font-light placeholder-pen-0 mobile:w-280"
            />
          </div>
          <div className="mt-20 mb-50">
            <label
              htmlFor="nickname"
              className="mr-32 inline-block w-54 text-left text-18 font-light mobile:mr-16"
            >
              닉네임
            </label>
            <input
              ref={nicknameRef}
              value={nickname}
              onChange={handleNickname}
              placeholder="닉네임을 입력해주세요"
              type="text"
              id="nickname"
              className="h-50 w-360 rounded-30 border-1 border-pen-0 px-24 font-light placeholder-pen-0 mobile:w-280"
            />
          </div>
        </div>
        <div className="mx-auto h-300 mobile:h-400 mobile:w-full">
          <p className="mb-20 text-20 font-medium">
            원하는 캐릭터를 선택해 주세요
          </p>
          <div className="flex flex-wrap justify-center">
            <img
              src="NFT_bg_1.gif"
              alt="ex"
              className="mx-10 inline-block h-200 w-150 rounded-20 border-4 border-pen-0 hover:border-red-2 mobile:h-160 mobile:w-120"
            />
            <img
              src="NFT_bg_2.gif"
              alt="ex"
              className="mx-10 inline-block h-200 w-150 rounded-20 border-4 border-pen-0 hover:border-red-2 mobile:h-160 mobile:w-120"
            />
            <img
              src="NFT_bg_3.gif"
              alt="ex"
              className="mx-10 inline-block h-200 w-150 rounded-20 border-4 border-pen-0 hover:border-red-2 mobile:h-160 mobile:w-120"
            />
          </div>
        </div>
        <CommonBtn
          width={240}
          height={55}
          fontSize={18}
          children={"다음"}
          onClick={finishUserInfo}
        />
      </div>
    </>
  );
}
