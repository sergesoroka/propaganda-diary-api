import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import '@/styles/globals.css'
import GoogleAnalitics from '../../utils/GoogleAnalitics'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <GoogleAnalitics />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
