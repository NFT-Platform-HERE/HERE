import "../index.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@/components/Header/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>HERE, 헌혈 NFT 플랫폼</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
