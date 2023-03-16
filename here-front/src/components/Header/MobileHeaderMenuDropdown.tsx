import { useRouter } from "next/router";

export default function MobileHeaderMenuDropdown() {
  const router = useRouter();

  return (
    <div className="flex h-270 flex-col justify-around bg-white pl-20 shadow-sm">
      <img
        src="/icons/logo.svg"
        className="h-29 w-60"
        onClick={() => router.push("/")}
      ></img>
      <div className="text-14" onClick={() => router.push("/donate")}>
        기부해요
      </div>
      <div className="text-14" onClick={() => router.push("/blood")}>
        헌혈해요
      </div>
      <div className="text-14" onClick={() => router.push("/submit")}>
        제출해요
      </div>
      <div className="text-14" onClick={() => router.push("/my-nft")}>
        나의 NFT
      </div>
      <div className="text-14" onClick={() => router.push("/signin")}>
        LOGIN
      </div>
    </div>
  );
}
