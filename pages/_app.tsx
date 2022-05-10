import '../styles/globals.css'
import type { AppProps } from 'next/app'
import UserProvider from '../provider/user.provider'
import { SocketProvider } from '../provider'
import { ErrorBoundary } from 'react-error-boundary'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<div>Error!</div>}>
        <UserProvider>
          <SocketProvider>
              <Component {...pageProps} />
          </SocketProvider>
        </UserProvider>
    </ErrorBoundary>
   
  )
}

export default MyApp
