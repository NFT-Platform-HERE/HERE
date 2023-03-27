import { useState } from "react";
import dynamic from "next/dynamic";
import { QrScanner } from "@yudiel/react-qr-scanner";

export default function RegisterPage() {
  const [data, setData] = useState("Not Found");

  return (
    <>
      <div className="h-300 w-300 overflow-hidden">
        <QrScanner
          onDecode={(result) => setData(result)}
          onError={(error) => console.log(error?.message)}
          containerStyle={{
            width: "300px",
            height: "300px",
          }}
          videoStyle={{ width: "300px", height: "300px" }}
        />
      </div>

      <p>{data}</p>
    </>
  );
}
