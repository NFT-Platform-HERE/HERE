import { useState } from "react";
import dynamic from "next/dynamic";
import { QrReader } from "react-qr-reader";

export default function RegisterPage() {
  const [data, setData] = useState("Not Found");

  return (
    <>
      <QrReader
        onScan={(data) => {
          setData(data);
        }}
        onError={(error) => {
          console.log(error);
        }}
        style={{ width: "500px" }}
      />
      <p>{data}</p>
    </>
  );
}
