import CommonBtn from "@/components/Button/CommonBtn";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import useCheckMemberEmailQuery from "@/hooks/member/useCheckMemberEmailQuery";
import useCheckMemberNicknameQuery from "@/hooks/member/useCheckMemberNicknameQuery";
import { debounce } from "lodash";

export default function SignUpPage() {
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);

  const [emailMessage, setEmailMessage] = useState<string>("");
  const [nicknameMessage, setNicknameMessage] = useState<string>("");
  const [characterId, setCharacterId] = useState<number | null>(null);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    nickname: "",
    characterName: "",
  });
  const { name, email, nickname, characterName } = inputs;

  const onChangeValue = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }, 1000);

  const isValidEmail = useCheckMemberEmailQuery({
    email,
    setEmailMessage,
  });
  const isValidNickname = useCheckMemberNicknameQuery({
    nickname,
    setNicknameMessage,
  });

  useEffect(() => {
    if (isValidEmail.isError) {
      setEmailMessage("유효하지 않은 이메일입니다");
    } else {
      setEmailMessage("");
    }
  }, [isValidEmail]);

  const finishUserInfo = () => {
    // 어느 상황에서 유효하지 않은지, 중복인지 체크 후 다시 작성
    if (emailMessage && emailRef.current) {
      emailRef.current.focus();
      return;
    }
    if (nickname.length < 2 && nicknameRef.current) {
      nicknameRef.current.focus();
      setNicknameMessage("닉네임의 길이가 너무 짧습니다");
      return;
    }

    if (!isValidNickname.isSuccess && nicknameRef.current) {
      nicknameRef.current.focus();
      return;
    }

    // 캐릭터도 선택시켜
    router.push("/");
  };

  return (
    <>
      <div className="mx-auto w-700 text-center mobile:w-full mobile:min-w-[300px]">
        <p className="mx-auto mt-30 inline-block text-28 mobile:hidden">
          회원정보 입력
        </p>
        <img
          src="next.svg"
          alt="logo"
          className="mx-auto mt-10 hidden h-80 w-160 mobile:block"
        />
        <div className="mx-auto mt-30 mobile:mt-0 mobile:w-full">
          <div className="mt-20">
            <label
              htmlFor="name"
              className="mr-32 inline-block w-54 text-left text-18 font-light mobile:mr-16"
            >
              이름
            </label>
            <input
              ref={nameRef}
              onChange={onChangeValue}
              placeholder="이름을 입력해주세요"
              type="text"
              id="name"
              name="name"
              className="h-50 w-360 rounded-30 border-1 border-pen-0 px-24 font-light placeholder-pen-0 mobile:w-280"
            />
            <p className="ml-140 inline-block h-20 w-360 text-left text-13 font-light text-red-2 mobile:ml-100 mobile:w-280"></p>
          </div>
          <div>
            <label
              htmlFor="email"
              className="mr-32 inline-block w-54 text-left text-18 font-light mobile:mr-16"
            >
              이메일
            </label>
            <input
              ref={emailRef}
              onChange={onChangeValue}
              placeholder="이메일을 입력해주세요"
              type="email"
              id="email"
              name="email"
              className="h-50 w-360 rounded-30 border-1 border-pen-0 px-24 font-light placeholder-pen-0 mobile:w-280"
            />
            <p className="ml-140 inline-block h-20 w-360 text-left text-13 font-light text-red-2 mobile:ml-100 mobile:w-280">
              {emailMessage}
            </p>
          </div>
          <div className="mt-0 mb-30">
            <label
              htmlFor="nickname"
              className="mr-32 inline-block w-54 text-left text-18 font-light mobile:mr-16"
            >
              닉네임
            </label>
            <input
              ref={nicknameRef}
              onChange={onChangeValue}
              placeholder="닉네임을 입력해주세요"
              type="text"
              name="nickname"
              id="nickname"
              className="h-50 w-360 rounded-30 border-1 border-pen-0 px-24 font-light placeholder-pen-0 mobile:w-280"
            />
            <p className="ml-140 inline-block h-20 w-360 text-left text-13 font-light text-red-2 mobile:ml-100 mobile:w-280 ">
              {nicknameMessage}
            </p>
          </div>
        </div>
        <div className="mx-auto h-300 mobile:h-400 mobile:w-full">
          <p className="mb-20 text-20 font-medium">
            원하는 캐릭터를 선택해 주세요
          </p>
          <div className="flex flex-wrap justify-center">
            <div>
              <input
                type="radio"
                value="one"
                id="one"
                name="characterName"
                className="peer hidden"
                onChange={onChangeValue}
              />
              <label
                htmlFor="one"
                className="mx-8 inline-block cursor-pointer rounded-20 border-4 border-pen-0 hover:border-red-2 peer-checked:border-red-2"
              >
                <img
                  src="NFT_bg_1.gif"
                  alt="ex"
                  className="inline-block h-200 w-150 rounded-16 p-0 mobile:h-160 mobile:w-120"
                />
              </label>
            </div>
            <div>
              <input
                type="radio"
                value="two"
                id="two"
                name="characterName"
                className="peer hidden"
                onChange={onChangeValue}
              />
              <label
                htmlFor="two"
                className="mx-8 inline-block cursor-pointer rounded-20 border-4 border-pen-0 hover:border-red-2 peer-checked:border-red-2"
              >
                <img
                  src="NFT_bg_2.gif"
                  alt="ex"
                  className="inline-block h-200 w-150 rounded-16 p-0 mobile:h-160 mobile:w-120"
                />
              </label>
            </div>
            <div>
              <input
                type="radio"
                value="three"
                id="three"
                name="characterName"
                className="peer hidden"
                onChange={onChangeValue}
              />
              <label
                htmlFor="three"
                className="mx-8 inline-block cursor-pointer rounded-20 border-4 border-pen-0 hover:border-red-2 peer-checked:border-red-2"
              >
                <img
                  src="NFT_bg_3.gif"
                  alt="ex"
                  className="inline-block h-200 w-150 rounded-16 p-0 mobile:h-160 mobile:w-120"
                />
              </label>
            </div>
          </div>
        </div>
        <CommonBtn
          width={240}
          height={55}
          fontSize={18}
          children={"다음"}
          isDisabled={false}
          onClick={finishUserInfo}
        />
      </div>
    </>
  );
}
