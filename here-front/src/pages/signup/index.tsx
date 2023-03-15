import SignupStep1 from "@/features/SignUp/SignupStep1";

export default function SignUpPage() {
  return (
    <div className="text-center">
      <div className="h-60 bg-pink-0">헤더자리...</div>
      <p className="mx-auto mt-30 inline-block w-full min-w-[600px] text-30">
        회원가입
      </p>
      <SignupStep1 />
    </div>
  );
}
