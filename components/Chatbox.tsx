import { AnimatePresence, motion } from "framer-motion"
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react"
import Image from "next/image"
import toast from "react-hot-toast"
import { useSocket, useUser } from "../provider/hooks"
import { ChatService } from "../services"
import ChatBar from "./ChatBar"
import MessageBox from "./MessageBox"
import MiniProfile from "./MiniProfile"
import { MiniProfileSkeleton } from "./skeleton"
import StartChat from "./StartChat"

type ChatBoxProps = {
  selectedUserId: number | null
  setShowDrawer: Dispatch<SetStateAction<boolean>>
  showDrawer: boolean
  setSelectedUserId: Dispatch<SetStateAction<number | null>>
}

const ChatBox = ({
  selectedUserId,
  setSelectedUserId,
  showDrawer,
  setShowDrawer,
}: ChatBoxProps) => {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [messages, setMessages] = useState<any>([])
  const [user] = useUser()
  const socket = useSocket()
  const messagesContainerRef = useRef<HTMLUListElement>(null)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [focusMessageInput, setFocusMessageInput] = useState(false)

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        behavior: "smooth",
        top: messagesContainerRef.current.scrollHeight,
      })
    }

    socket.on("new_message", (data) => {
      if (selectedUserId === data.sender.id) {
        if (messages) {
          setMessages([...messages, data])
        }
      }
    })

    return () => {
      socket.off("new_message")
    }
  }, [selectedUserId, messages, socket])

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        setShowDrawer(true)
        setSelectedUser(null)
        setSelectedUserId(null)
      } else {
        setShowDrawer(false)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (selectedUser) {
      socket.on(`user_status:${selectedUser.id}`, (status) => {
        setSelectedUser({
          ...selectedUser,
          status,
        })
      })

      return () => {
        socket.off(`user_status:${selectedUser.id}`)
      }
    }
  }, [selectedUser, socket])

  useEffect(() => {
    const fetchChat = async (id: number) => {
      const [data, error] = await ChatService.fetchChat(id)
      if (error) {
        toast.error(error.message, {
          duration: 15000,
        })
      }

      setSelectedUser(data.user)

      if (data.chat) {
        setMessages(data.chat.messages)
      } else {
        setMessages([])
      }
    }

    if (selectedUserId) {
      fetchChat(selectedUserId as number)
    }
  }, [selectedUserId])

  return selectedUser ? (
    <AnimatePresence>
      {showDrawer && (
        <main className="fixed bottom-0 z-10 flex items-end w-full h-full bg-opacity-50 bg-dark-60 md:bg-transparent md:relative md:col-start-1 md:col-end-9 lg:col-start-5 lg:col-end-13">
          <motion.div
            initial={
              showDrawer
                ? {
                    y: 60,
                    opacity: 0,
                  }
                : undefined
            }
            animate={
              showDrawer
                ? {
                    y: 0,
                    opacity: 1,
                  }
                : undefined
            }
            exit={
              showDrawer
                ? {
                    y: 60,
                    opacity: 0,
                  }
                : undefined
            }
            className="w-full relative mt-4 md:mt-0 h-[95%] md:h-full bg-dark-80  rounded-tl-[30px] rounded-tr-[30px] md:rounded-[10px] p-4 xl:p-8  flex flex-col"
          >
            <motion.div
              initial={{
                scale: 0.5,
              }}
              animate={{
                x: "50%",
                transformOrigin: "center",
                scale: 1,
              }}
              className="absolute w-12 h-12 -translate-x-1/2 border-4 rounded-full cursor-pointer md:hidden right-1/2 border-dark-80 md:invisible -top-6 bg-light-80"
              onClick={() => {
                setSelectedUserId(null)
                setSelectedUser(null)
                setShowDrawer(false)
              }}
            ></motion.div>

            <div className="">
              {selectedUser ? (
                <MiniProfile
                  profileImg={"/unnamed.png"}
                  lastActiveAt={selectedUser.lastActiveAt || undefined}
                  username={selectedUser.username}
                  status={selectedUser.status}
                />
              ) : (
                <MiniProfileSkeleton />
              )}
            </div>
            {messages.length > 0 ? (
              <ul
                ref={messagesContainerRef}
                className="flex-1 scroll-smooth scrollbar-style flex basis-[40px] flex-col overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:hover:overflow-y-auto mb-2"
              >
                {messages?.length > 0 &&
                  messages.map((message: any) => (
                    <MessageBox
                      key={message.id}
                      setFocusMessageInput={setFocusMessageInput}
                      setSelectedMessage={setSelectedMessage}
                      parent={message.parent}
                      id={message.id}
                      messageStatus={message.messageStatus}
                      sender={message.sender}
                      isSender={message.sender.id === user?.id}
                      message={message.message}
                      createdAt={message.createdAt}
                    />
                  ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1">
                <div>
                  <Image
                    alt={"Start a chat illustration"}
                    src="/illustrations/1.png"
                    width="64"
                    height="64"
                  />
                </div>
                <p className="font-bold text-light-80">
                  Start a chat with{" "}
                  <span className="text-primary-100">
                    {selectedUser.username}
                  </span>
                </p>
              </div>
            )}
            <ChatBar
              setFocusMessageInput={setFocusMessageInput}
              focusMessageInput={focusMessageInput}
              setSelectedMessage={setSelectedMessage}
              selectedMessage={selectedMessage}
              messages={messages}
              setMessages={setMessages}
              selectedUserId={selectedUserId}
            />
          </motion.div>
        </main>
      )}
    </AnimatePresence>
  ) : (
    <StartChat />
  )
}

export default ChatBox
