import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import fetchJson from "../lib/fetchJson";
import "../styles/globals.css";
import "../assets/fonts/inter/inter.css";
import Router from "next/router";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import NotificationsCenter from "../components/notifications/NotificationsCenter";
import NotificationsContainer from "../components/notifications/NotificationContainer";
import { useAlert } from "../components/notifications";
import NextNProgress from "nextjs-progressbar";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const alert = useAlert();
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          if (err.data.code == 403) {
            Router.push("/login");
            return;
          }
          if (err.data.code == 401) {
            Router.push("/login");
            return;
          }

          alert({
            id: "err-" + Math.random() * 1000000,
            type: "error",
            title: "Errore",
            message: err.message,
            isAlert: true,
            read: false,
          });
        },
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NotificationsContainer />
          <NextNProgress color="#136bb6" options={{ showSpinner: false }} />
          {getLayout(<Component {...pageProps} />)}
        </PersistGate>
      </Provider>
    </SWRConfig>
  );
}
