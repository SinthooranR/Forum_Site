import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { AuthProvider } from "@/util/auth-context";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <div className="mt-12">
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </>
  );
}
