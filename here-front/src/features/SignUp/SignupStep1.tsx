import { useState } from "react";

export default function SignupStep1() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  return (
    <div>
      <img
        src="signup/step1.svg"
        alt="step1"
        className="inline-block w-600 min-w-[600px]"
      />
      <div className="mx-auto mt-50 w-600">
        <div className="my-20">
          <label
            htmlFor="email"
            className="inline-block w-180 text-left text-18 font-light"
          >
            * 이메일
          </label>
          <input
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="이메일을 입력해주세요"
            type="text"
            id="email"
            className="h-50 w-360 rounded-30 border-1 border-pen-0 px-24 font-light placeholder-pen-0"
          />
        </div>
        <div className="my-20">
          <label
            htmlFor="password"
            className="inline-block w-180 text-left text-18 font-light"
          >
            * 비밀번호
          </label>
          <input
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="비밀번호를 입력해주세요"
            type="password"
            id="password"
            className="h-50 w-360 rounded-30 border-1 border-pen-0 px-24 font-light placeholder-pen-0"
          />
        </div>
        <div className="my-20">
          <label
            htmlFor="password-check"
            className="inline-block w-180 text-left text-18 font-light"
          >
            * 비밀번호 확인
          </label>
          <input
            value={passwordConfirm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPasswordConfirm(e.target.value)
            }
            placeholder="비밀번호를 다시 입력해주세요"
            type="password"
            id="password-check"
            className="h-50 w-360 rounded-30 border-1 border-pen-0 px-24 font-light placeholder-pen-0"
          />
        </div>
        <div className="my-20">
          <label
            htmlFor="nickname"
            className="inline-block w-180 text-left text-18 font-light"
          >
            * 닉네임
          </label>
          <input
            value={nickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNickname(e.target.value)
            }
            placeholder="닉네임을 입력해주세요"
            type="text"
            id="nickname"
            className="h-50 w-360 rounded-30 border-1 border-pen-0 px-24 font-light placeholder-pen-0"
          />
        </div>
      </div>
    </div>
  );
}
