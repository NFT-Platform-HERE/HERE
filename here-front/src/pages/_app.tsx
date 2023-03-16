import "../index.css";
import type { AppProps } from "next/app";
import WebHeader from "@/components/Header/WebHeader";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WebHeader />
      <Component {...pageProps} />
    </>
  );
}
