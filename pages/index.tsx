import type { NextPage } from 'next'
import { ChatBox, SideBar } from '../components'



const App: NextPage = () => {
  return (
    <main className="grid grid-cols-12 h-screen gap-5 px-10 py-8">
      <SideBar/>
      <ChatBox/>
    </main>
  )
}

export default App
