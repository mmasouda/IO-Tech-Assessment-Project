import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StoreProvider } from "../redux/StoreProvider";
import localFont from 'next/font/local';

const myFont = localFont({ src: '../font/Neutra Text Light.otf' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <main
        className={`${myFont.className}`}>
        <Component {...pageProps} />
      </main>
    </StoreProvider>
  );
}
