import "../index.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@/components/Header/Header";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "@/stores/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import LiveAlarmModal from "@/features/Alarm/LiveAlarmModal";
import Background from "@/components/Background/Background";
import { useDispatch } from "react-redux";
import { setClose } from "@/stores/alarm/alarm";
import WebAlarmDetailModal from "@/features/Alarm/WebAlarmDetailModal";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const getLibrary = (provider: any) => {
    return new Web3Provider(provider);
  };

  return (
    <>
      <Head>
        <title>HERE, 헌혈 NFT 플랫폼</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="text/javascript"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
        ></script>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistStore(store)}>
                <Header />
                <LiveAlarmModal />
                <WebAlarmDetailModal />
                <Component {...pageProps} />
              </PersistGate>
            </Provider>
          </Web3ReactProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
