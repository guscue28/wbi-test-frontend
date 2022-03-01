import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {AppDataprovider} from '../context/appData.context';
import Navbar from '../components/navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppDataprovider>
      <Navbar />
      <Component {...pageProps} />
      </AppDataprovider>
      )
}

export default MyApp
