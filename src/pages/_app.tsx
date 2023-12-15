import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { AuthProvider } from "@/util/auth-context";
import axios from "axios";
import type { AppProps } from "next/app";

axios.defaults.withCredentials = true;

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
