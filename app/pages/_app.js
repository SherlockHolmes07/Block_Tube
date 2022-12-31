import { LivepeerConfig } from '@livepeer/react';
import '../styles/globals.css'
import LivePeerClient from "./LivepeerClient";

export default function App({ Component, pageProps }) {
  return(
    <LivepeerConfig client={LivePeerClient} >
      <Component {...pageProps} />
    </LivepeerConfig>
  ) ;
}
