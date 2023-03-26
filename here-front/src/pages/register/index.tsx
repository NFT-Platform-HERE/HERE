import { useState } from "react";
import dynamic from "next/dynamic";
import QrReader from "react-qr-scanner";
import { useQRCode } from "next-qrcode";

const BarcodeScannerComponent = dynamic(
  () => import("react-qr-barcode-scanner"),
);

export default function RegisterPage() {
  const [data, setData] = useState("Not Found");

  return (
    <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result: any) => {
          if (result) setData(result.text);
          else setData("Not Found");
        }}
      />
      <p>{data}</p>
    </>
  );
}
