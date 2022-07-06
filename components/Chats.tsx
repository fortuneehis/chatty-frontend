import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useSocket } from "../provider/hooks"
import { ChatService } from "../services"
import { toast } from "react-hot-toast"
import Chat from "./Chat"
import { ChatsSkeleton } from "./skeleton"

type ChatsProps = {
  selectedUserId: number | null
  setSelectedUserId: Dispatch<SetStateAction<number | null>>
  setShowChatboxDrawer: Dispatch<SetStateAction<boolean>>
}

const Chats = ({
  selectedUserId,
  setSelectedUserId,
  setShowChatboxDrawer,
}: ChatsProps) => {
  const [chats, setChats] = useState<any>([])

  const [loading, setLoading] = useState(true)

  const socket = useSocket()

  useEffect(() => {
    socket.on("chats", (data) => {
      setChats([data, ...chats.filter((chat: any) => chat.id !== data.id)])
    })

    return () => {
      socket.off("chats")
    }
  }, [socket, chats])

  useEffect(() => {
    const fetchChats = async () => {
      const [data, error] = await ChatService.fetchChats()

      if (error) {
        toast.error(error.message, {
          duration: 15000,
        })
      }

      setChats(data)
      setLoading(false)
    }

    fetchChats()
  }, [])

  return loading ? (
    <ChatsSkeleton />
  ) : (
    <div className="my-12">
      <h1 className="mb-4 text-2xl font-bold text-light-100 lg:mb-2 xl:mb-4">
        Chats
      </h1>
      <ul>
        {chats?.length > 0 ? (
          chats.map(({ id, user: chat, recentMessage }: any) => (
            <div key={chat.user.id} onClick={() => setShowChatboxDrawer(true)}>
              <Chat
                userId={chat.user.id}
                status={chat.user.status}
                selectedUserId={selectedUserId}
                setSelectedUserId={setSelectedUserId}
                username={chat.user.username}
                recentMessage={recentMessage}
                chatId={id}
              />
            </div>
          ))
        ) : (
          <div className=" flex flex-col p-8 items-center bg-dark-100 rounded-[10px]">
            <Image
              alt="no recent chat"
              src="/illustrations/2.png"
              width="48"
              height="48"
            />
            <p className="text-lg font-bold text-center text-light-100 ">
              No recent chat
            </p>
          </div>
        )}
      </ul>
    </div>
  )
}

export default Chats
