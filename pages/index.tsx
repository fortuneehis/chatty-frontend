import type { NextPage, NextPageContext } from 'next'
import { ChatBox, SideBar } from '../components'



const App: NextPage = () => {
  return (
    <main className="xl:max-w-[1440px] grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 h-screen gap-5 md:px-10 md:py-8 w-screen">
      <SideBar/>
      <ChatBox/>
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
