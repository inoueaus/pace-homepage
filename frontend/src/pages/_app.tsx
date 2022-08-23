import "../../styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "../components/layout/AppLayout";
import AuthProvider from "../context/AuthProvider";
import RouteGuard from "../components/layout/RouteGuard";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppLayout>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </AppLayout>
    </AuthProvider>
  );
}

export default MyApp;
