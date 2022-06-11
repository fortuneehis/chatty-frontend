import '../styles/globals.css'
import type { AppProps } from 'next/app'
import UserProvider from '../provider/user.provider'
import { SocketProvider } from '../provider'
import { ErrorBoundary } from 'react-error-boundary'
import { Error } from '../components'
import {  NextPage } from 'next'
import { Toaster } from 'react-hot-toast'

interface ExtendedAppProps extends AppProps {
    Component: NextPage & { isAPrivatePage: ()=>boolean }
}

function MyApp({ Component, pageProps }: ExtendedAppProps) {
  const isAPrivatePage = Component.isAPrivatePage ?? (()=>false)
  return (
    
    <ErrorBoundary fallback={<Error/>}>
         <Toaster toastOptions={{
        duration: 1500,
          style: {
              background: "FCFCFC",
              color: "#121212"
          }
        }}/>
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
