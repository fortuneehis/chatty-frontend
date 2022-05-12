import '../styles/globals.css'
import type { AppProps } from 'next/app'
import UserProvider from '../provider/user.provider'
import { SocketProvider } from '../provider'
import { ErrorBoundary } from 'react-error-boundary'
import { Error } from '../components'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<Error/>}>
        <UserProvider>
          <SocketProvider>
              <Component {...pageProps} />
          </SocketProvider>
        </UserProvider>
    </ErrorBoundary>
   
  )
}

export default MyApp
