import { useRouter } from "next/navigation";

export default function DonateFloatingActionButton() {
  const router = useRouter();

  return (
    <div className="fixed bottom-13 right-13 hidden mobile:inline-block">
      <img
        src="/icons/floating-action-button.svg"
        onClick={() => router.push("/donate/write")}
      />
    </div>
  );
}
