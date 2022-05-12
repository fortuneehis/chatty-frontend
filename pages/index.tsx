import type { NextPage, NextPageContext } from 'next'
import { useEffect, useState } from 'react'
import { ChatBox, SideBar } from '../components'



const App: NextPage = () => {

  const [selectedUserId, setSelectedUserId] = useState<number|null>(null)

  return (
    <main className="xl:max-w-[1440px] grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 h-screen gap-5 md:px-10 md:py-8 w-screen">
      <SideBar selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId}/>
      <ChatBox selectedUserId={selectedUserId}/>
    </main>
  )
}

export const getServerSideProps = ({req, res}: NextPageContext) => {
    //fetch user from API 
      //if user exists pass obj as props
      //else redirect (302) to login page
      return {
        props: {}
      }
}

export default App
