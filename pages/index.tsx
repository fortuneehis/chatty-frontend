import type { NextPage, NextPageContext } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ChatBox, SideBar } from '../components'
import StartChat from '../components/StartChat'
import { UserService } from '../services'



const App: NextPage & {isAPrivatePage: ()=>boolean}= () => {

  const [selectedUserId, setSelectedUserId] = useState<number|null>(null)

  return (
    <main className="xl:max-w-[1440px] grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 h-screen gap-5 md:px-10 md:py-8 w-screen">
      <SideBar matches="(min-width: 1768px)" selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId}/>
      <ChatBox matches="(mix-width: 768px)" selectedUserId={selectedUserId}/> 
    </main>
  )
}



App.isAPrivatePage = () => true



export const getServerSideProps = async({req, res}: NextPageContext) => {

  const cookies = req?.headers.cookie as string
  if(!cookies) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }

  const [response, error] = await UserService.getCurrentUser({
    Cookie: cookies
  })
  
  const user = response?.data
  
    if(error|| !user) {
      return {
          redirect: {
              destination: "/login",
              permanent: false
          }
      }
    }
      return {
          props: {}
      }

}

export default App
