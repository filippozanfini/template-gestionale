import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import fetchJson from "../lib/fetchJson";
import "../styles/globals.css";
import "../assets/fonts/inter/inter.css";
import Router from "next/router";
import { store } from "../redux/store";
import { Provider } from "react-redux";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.log("error", err.data);
          if (err.data.code === 403) {
            Router.push("/login");
            return;
          }
          if (err.data.code === 401) {
            Router.push("/login");
            return;
          }
        },
      }}
    >
      <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
    </SWRConfig>
  );
}
