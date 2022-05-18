import '../styles/globals.css'
import type { AppProps } from 'next/app'
import UserProvider from '../provider/user.provider'
import { SocketProvider } from '../provider'
import { ErrorBoundary } from 'react-error-boundary'
import { Error } from '../components'
import {  NextPage } from 'next'

interface ExtendedAppProps extends AppProps {
    Component: NextPage & { isAPrivatePage: ()=>boolean }
}

function MyApp({ Component, pageProps }: ExtendedAppProps) {
  const isAPrivatePage = Component.isAPrivatePage ?? (()=>false)
  return (
    <ErrorBoundary fallback={<Error/>}>
        {
          isAPrivatePage() === true ? (
            <UserProvider>
              <SocketProvider>
                <Component {...pageProps} />
              </SocketProvider>
            </UserProvider>
          ) : (
            <Component {...pageProps} />
          )
        }
    </ErrorBoundary>
   
  )
}

export default MyApp
