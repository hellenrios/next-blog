// src/pages/_app.tsx
import { useEffect } from "react";
import Router from "next/router";
import nProgress from "nprogress";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/authContext";

nProgress.configure({ showSpinner: false });

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const handleRouteChangeStart = () => {
      nProgress.start();
    };

    const handleRouteChangeComplete = () => {
      nProgress.done();
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    Router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
      Router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
