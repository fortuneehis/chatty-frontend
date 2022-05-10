import type { NextPage } from 'next'
import { ChatBox, SideBar } from '../components'



const App: NextPage = () => {
  return (
    <div className="grid grid-cols-12 h-screen gap-5 px-10 py-8">
      <SideBar/>
      <ChatBox/>
    </div>
  )
}

export default App
