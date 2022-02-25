import '../styles/globals.css'
import type { AppProps } from 'next/app'
import GlobalState from '../context/global/GlobalState';
import Navbar from '../components/navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalState>
      <Navbar />
      <Component {...pageProps} />
      </GlobalState>
      )
}

export default MyApp
