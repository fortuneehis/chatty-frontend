import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useSocket, useUser } from "../provider/hooks"
import { textOverflowFix } from "../utils/string"
import dynamic from "next/dynamic"

type ChatBarProps = {
  selectedUserId: number | null
  messages: any
  selectedMessage: any
  setSelectedMessage: Dispatch<SetStateAction<any>>
  setMessages: Dispatch<SetStateAction<any>>
  focusMessageInput: boolean
  setFocusMessageInput: Dispatch<SetStateAction<boolean>>
}

const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

export const ChatBar = ({
  selectedUserId,
  setFocusMessageInput,
  focusMessageInput,
  setSelectedMessage,
  selectedMessage,
  messages,
  setMessages,
}: ChatBarProps) => {
  const [isVoiceMessage] = useState(false)
  const socket = useSocket()
  const [user] = useUser()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const inputSelectionEnd = useRef(0)
  const inputSelectionStart = useRef(0)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [message, setMessage] = useState("")

  const sendMessage = () => {
    const content = message.trim()

    if (content.length === 0) {
      return
    }

    toast.loading("Sending message...", {
      id: "sending-message",
    })

    socket.emit(
      "new_message",
      {
        receiverId: selectedUserId,
        isVoiceMessage,
        message: content,
        parentId: selectedMessage?.id ?? null,
      },
      (data: any) => {
        if (messages) {
          setMessages((prev: any) => [...prev, data])
        }
      }
    )
    if (selectedMessage) {
      setSelectedMessage(null)
    }

    setShowEmojiPicker(false)

    setMessage("")
  }

  useEffect(() => {
    if (focusMessageInput && inputRef.current && selectedMessage) {
      inputRef.current.focus()
    }
    if (!selectedMessage) {
      setFocusMessageInput(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusMessageInput, selectedMessage])

  return (
    <div className="relative">
      <div className="relative flex flex-col items-start w-full mb-2 md:mb-0">
        {selectedMessage && (
          <div className="flex items-center">
            <div className="relative p-2 my-1 bg-dark-60 rounded-[10px]">
              <p className="text-xs font-bold text-light-40">
                {selectedMessage.sender.id === user?.id
                  ? "You"
                  : selectedMessage.sender.username}
              </p>
              <p className="text-light-60 ">
                {textOverflowFix(selectedMessage.message, 25)}
              </p>
            </div>
            <div
              onClick={() => setSelectedMessage(null)}
              className="p-1 ml-1 active:bg-dark-100 hover:bg-dark-100 rounded-[10px] cursor-pointer"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-primary-100"
                  d="M13.4099 12L17.7099 7.71C17.8982 7.5217 18.004 7.2663 18.004 7C18.004 6.7337 17.8982 6.47831 17.7099 6.29C17.5216 6.1017 17.2662 5.99591 16.9999 5.99591C16.7336 5.99591 16.4782 6.1017 16.2899 6.29L11.9999 10.59L7.70994 6.29C7.52164 6.1017 7.26624 5.99591 6.99994 5.99591C6.73364 5.99591 6.47824 6.1017 6.28994 6.29C6.10164 6.47831 5.99585 6.7337 5.99585 7C5.99585 7.2663 6.10164 7.5217 6.28994 7.71L10.5899 12L6.28994 16.29C6.19621 16.383 6.12182 16.4936 6.07105 16.6154C6.02028 16.7373 5.99414 16.868 5.99414 17C5.99414 17.132 6.02028 17.2627 6.07105 17.3846C6.12182 17.5064 6.19621 17.617 6.28994 17.71C6.3829 17.8037 6.4935 17.8781 6.61536 17.9289C6.73722 17.9797 6.86793 18.0058 6.99994 18.0058C7.13195 18.0058 7.26266 17.9797 7.38452 17.9289C7.50638 17.8781 7.61698 17.8037 7.70994 17.71L11.9999 13.41L16.2899 17.71C16.3829 17.8037 16.4935 17.8781 16.6154 17.9289C16.7372 17.9797 16.8679 18.0058 16.9999 18.0058C17.132 18.0058 17.2627 17.9797 17.3845 17.9289C17.5064 17.8781 17.617 17.8037 17.7099 17.71C17.8037 17.617 17.8781 17.5064 17.9288 17.3846C17.9796 17.2627 18.0057 17.132 18.0057 17C18.0057 16.868 17.9796 16.7373 17.9288 16.6154C17.8781 16.4936 17.8037 16.383 17.7099 16.29L13.4099 12Z"
                />
              </svg>
            </div>
          </div>
        )}
        <div className="flex w-full">
          <div className="flex-1 items-center bg-dark-60 p-2 md:p-4 rounded-[10px] flex">
            <textarea
              ref={inputRef}
              onSelect={(e) => {
                inputSelectionEnd.current = e.currentTarget.selectionEnd
                inputSelectionStart.current = e.currentTarget.selectionStart
                e.currentTarget.setSelectionRange(
                  e.currentTarget.selectionStart,
                  e.currentTarget.selectionEnd
                )
              }}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
              }}
              className="flex-1 w-full text-base bg-transparent outline-none resize-none placeholder:text-light-40 h-7 text-light-40"
              placeholder="Write a message"
            />
            <div className="flex">
              <div
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="p-1 active:bg-dark-100 hover:bg-dark-100 rounded-[10px] cursor-pointer"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0001 29.3333C23.3521 29.3333 29.3334 23.352 29.3334 16C29.3334 8.64799 23.3521 2.66666 16.0001 2.66666C8.64808 2.66666 2.66675 8.64799 2.66675 16C2.66675 23.352 8.64808 29.3333 16.0001 29.3333ZM20.6574 12C20.9233 11.9932 21.1878 12.0397 21.4354 12.1368C21.6829 12.2338 21.9086 12.3795 22.099 12.5651C22.2894 12.7508 22.4407 12.9727 22.5439 13.2178C22.6472 13.4628 22.7004 13.7261 22.7003 13.992C22.7002 14.2579 22.6469 14.5212 22.5434 14.7661C22.44 15.0111 22.2885 15.2329 22.098 15.4185C21.9075 15.604 21.6818 15.7495 21.4341 15.8464C21.1865 15.9433 20.9219 15.9896 20.6561 15.9827C20.1369 15.969 19.6435 15.7532 19.2812 15.3811C18.9188 15.009 18.7161 14.5101 18.7163 13.9907C18.7164 13.4713 18.9195 12.9725 19.2821 12.6006C19.6447 12.2288 20.1382 12.0133 20.6574 12ZM14.9227 21.2253C15.6339 21.368 16.3663 21.368 17.0774 21.2253C17.4147 21.156 17.7507 21.0507 18.0774 20.9147C18.3894 20.7813 18.6961 20.616 18.9827 20.424C19.2601 20.2347 19.5254 20.016 19.7707 19.772C20.0147 19.5293 20.2334 19.264 20.4227 18.9827L22.6334 20.472C22.0587 21.3238 21.3259 22.0575 20.4747 22.6333C19.6076 23.2185 18.6341 23.628 17.6094 23.8387C16.5471 24.0521 15.4529 24.0516 14.3907 23.8373C13.3657 23.6297 12.3922 23.2205 11.5267 22.6333C10.6756 22.0561 9.94211 21.3222 9.36542 20.4707L11.5761 18.9813C11.7667 19.2627 11.9854 19.528 12.2267 19.768C12.9629 20.5078 13.9005 21.0147 14.9227 21.2253ZM11.3334 12C11.5961 12.0001 11.8563 12.0519 12.099 12.1525C12.3417 12.2532 12.5622 12.4006 12.7479 12.5864C12.9336 12.7723 13.0809 12.9929 13.1814 13.2357C13.2818 13.4784 13.3335 13.7386 13.3334 14.0013C13.3333 14.2641 13.2815 14.5242 13.1809 14.7669C13.0802 15.0096 12.9328 15.2301 12.747 15.4158C12.5611 15.6015 12.3405 15.7488 12.0978 15.8493C11.855 15.9497 11.5948 16.0014 11.3321 16.0013C10.8015 16.0011 10.2927 15.7902 9.91759 15.4149C9.54252 15.0395 9.3319 14.5306 9.33208 14C9.33226 13.4694 9.54321 12.9606 9.91853 12.5855C10.2939 12.2104 10.8028 11.9998 11.3334 12Z"
                    fill="#0065CA"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            onClick={sendMessage}
            className="bg-dark-60 active:bg-dark-100 hover:bg-dark-100 p-4 ml-2 rounded-[10px] cursor-pointer flex items-center justify-center"
          >
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.2743 10.7924L1.80207 0.126876C1.58585 0.0194876 1.34521 -0.0209578 1.10809 0.010236C0.870966 0.0414299 0.647091 0.142983 0.462461 0.303103C0.27783 0.463223 0.14002 0.67534 0.0650332 0.914822C-0.00995393 1.1543 -0.0190415 1.41133 0.038826 1.65604L1.56967 8.12067L11.3686 11.9989L1.56967 15.8772L0.038826 22.3418C-0.0201303 22.5867 -0.0118012 22.8442 0.0628391 23.0843C0.137479 23.3244 0.275345 23.5371 0.460308 23.6975C0.645271 23.8579 0.869685 23.9594 1.1073 23.9901C1.34491 24.0208 1.5859 23.9795 1.80207 23.871L23.2743 13.2055C23.4912 13.0978 23.6747 12.9272 23.8032 12.7135C23.9318 12.4999 24 12.252 24 11.9989C24 11.7458 23.9318 11.498 23.8032 11.2843C23.6747 11.0707 23.4912 10.9 23.2743 10.7924V10.7924Z"
                  fill="#0065CA"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {showEmojiPicker && (
        <div className="relative right-0 w-full mb-2 max-h-[128px] md:max-h-[256px] md:max-w-[420px] overflow-hidden md:absolute md:bottom-full">
          <EmojiPicker
            pickerStyle={{
              boxShadow: "none",
              border: "none",
              backgroundColor: "#1A1A1A",
              color: "#CECECE",
              width: "100%",
            }}
            disableSearchBar={true}
            onEmojiClick={(_, data) => {
              if (inputRef.current) {
                setMessage(
                  `${message.slice(0, inputSelectionEnd.current)}${
                    data.emoji
                  }${message.slice(inputSelectionEnd.current)}`
                )
                inputSelectionStart.current += data.emoji.length
                inputSelectionEnd.current += data.emoji.length
                inputRef.current.setSelectionRange(
                  inputSelectionStart.current,
                  inputSelectionEnd.current
                )
              }
            }}
          />
        </div>
      )}
    </div>
  )
}

export default ChatBar
