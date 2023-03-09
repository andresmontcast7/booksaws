import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../configureAmplify'
import {NavBar} from '../pages/components/Navbar'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
    <NavBar></NavBar>
    <Component {...pageProps} />
    </>

  ) 
}
