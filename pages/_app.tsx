import '../styles/globals.css'
import type { AppProps } from 'next/app'
import UserProvider from '../provider/user.provider'
import { SocketProvider } from '../provider'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <SocketProvider>
          <Component {...pageProps} />
      </SocketProvider>
    </UserProvider>
   
  )
}

export default MyApp
