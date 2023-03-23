import CommonBtn from "@/components/Button/CommonBtn";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import useCheckMemberEmailQuery from "@/apis/member/useCheckMemberEmailQuery";
import useCheckMemberNicknameQuery from "@/apis/member/useCheckMemberNicknameQuery";
import { debounce } from "lodash";
import useCharacterQuery from "@/apis/member/useCharacterQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useSignup from "@/apis/member/useSignup";
import { Signup } from "@/types/Signup";

export default function SignUpPage() {
  const { mutate } = useSignup();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);

  const walletAddress = useSelector((state: RootState) => {
    return state.member.walletAddress;
  });
  const [nameMessage, setNameMessage] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [nicknameMessage, setNicknameMessage] = useState<string>("");

  const [newEmail, setNewEmail] = useState<string>("");
  const [newNickname, setNewNickname] = useState<string>("");

  const { data } = useCharacterQuery();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    nickname: "",
    characterId: 0,
  });
  const { name, email, nickname, characterId } = inputs;

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const isValidEmail = useCheckMemberEmailQuery({
    email: newEmail,
    setEmailMessage,
  });
  const isValidNickname = useCheckMemberNicknameQuery({
    nickname: newNickname,
    setNicknameMessage,
  });
  console.log(isValidEmail.status, isValidNickname);

  const finishUserInfo = () => {
    setNewEmail(email);
    setNewNickname(nickname);
  };

  useEffect(() => {
    // 이름 길이 확인
    if ((name.length < 2 || name.length > 5) && nameRef.current) {
      setNameMessage("유효하지 않은 이름입니다");
      nameRef.current.focus();
      return;
    }
    // 이메일
    if (!isValidEmail.isSuccess && emailRef.current) {
      emailRef.current.focus();
      return;
    }
    //닉네임 길이 확인 + 유효성 확인
    if (
      (nickname.length < 2 || !isValidNickname.isSuccess) &&
      nicknameRef.current
    ) {
      nicknameRef.current.focus();
      return;
    }
    // 캐릭터 선택 여부
    if (characterId === 0) {
      return;
    }

    const payload: Signup = {
      walletAddress,
      name,
      nickname: newNickname,
      email: newEmail,
      characterId,
    };
    mutate(payload);
  }, [isValidEmail.status, isValidNickname.status]);

  return (
    <>
      <div className="mx-auto mb-30 w-700 text-center mobile:w-full mobile:min-w-[300px]">
        <p className="mx-auto mt-30 inline-block text-28 mobile:text-24">
          회원정보 입력
        </p>
        <div className="mx-auto mt-30 mobile:mt-0 mobile:w-[90%]">
          <div className="mt-20">
            <label
              htmlFor="name"
              className="mr-32 inline-block w-54 text-left text-18 font-light mobile:mr-8"
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
              className="h-50 w-360 rounded-30 border-1 border-pen-0 px-24 font-light placeholder-pen-0 mobile:w-260"
            />
            <p className="ml-140 inline-block h-20 w-360 text-left text-13 font-light text-red-2 mobile:ml-100 mobile:w-200">
              {nameMessage}
            </p>
          </div>
          <div>
            <label
              htmlFor="email"
              className="mr-32 inline-block w-54 text-left text-18 font-light mobile:mr-8"
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
              className="h-50 w-360 rounded-30 border-1 border-pen-0 px-24 font-light placeholder-pen-0 mobile:w-260"
            />
            <p className="ml-140 inline-block h-20 w-360 text-left text-13 font-light text-red-2 mobile:ml-100 mobile:w-200">
              {emailMessage}
            </p>
          </div>
          <div className="mt-0 mb-30">
            <label
              htmlFor="nickname"
              className="mr-32 inline-block w-54 text-left text-18 font-light mobile:mr-8"
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
              className="h-50 w-360 rounded-30 border-1 border-pen-0 px-24 font-light placeholder-pen-0 mobile:w-260"
            />
            <p className="ml-140 inline-block h-20 w-360 text-left text-13 font-light text-red-2 mobile:ml-100 mobile:w-200 ">
              {nicknameMessage}
            </p>
          </div>
        </div>
        <div className="mx-auto h-300 mobile:h-380 mobile:w-full">
          <p className="mb-20 text-20 font-medium">
            원하는 캐릭터를 선택해 주세요
          </p>
          <div className="flex flex-wrap justify-center">
            <div>
              <input
                type="radio"
                value={data ? data[0].characterId : 0}
                id="cat"
                name="characterId"
                className="peer hidden"
                onChange={onChangeValue}
              />
              <label
                htmlFor="cat"
                className="mx-8 inline-block cursor-pointer rounded-20 border-4 border-pen-0 hover:border-red-2 peer-checked:border-red-2"
              >
                <img
                  src={data ? data[0].characterImgUrl : ""}
                  alt="cat"
                  className="inline-block h-200 w-200 rounded-16 p-0 mobile:h-140 mobile:w-140"
                />
              </label>
            </div>
            <div>
              <input
                type="radio"
                value={data ? data[1].characterId : 0}
                id="deer"
                name="characterId"
                className="peer hidden"
                onChange={onChangeValue}
              />
              <label
                htmlFor="deer"
                className="mx-8 inline-block cursor-pointer rounded-20 border-4 border-pen-0 hover:border-red-2 peer-checked:border-red-2"
              >
                <img
                  src={data ? data[1].characterImgUrl : ""}
                  alt="deer"
                  className="inline-block h-200 w-200 rounded-16 p-0 mobile:h-140 mobile:w-140"
                />
              </label>
            </div>
            <div className="mobile:mt-10">
              <input
                type="radio"
                value={data ? data[2].characterId : 0}
                id="dog"
                name="characterId"
                className="peer hidden"
                onChange={onChangeValue}
              />
              <label
                htmlFor="dog"
                className="mx-8 inline-block cursor-pointer rounded-20 border-4 border-pen-0 hover:border-red-2 peer-checked:border-red-2"
              >
                <img
                  src={data ? data[2].characterImgUrl : ""}
                  alt="dog"
                  className="inline-block h-200 w-200 rounded-16 p-0 mobile:h-140 mobile:w-140"
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
