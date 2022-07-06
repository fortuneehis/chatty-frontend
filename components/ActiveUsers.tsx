import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useSocket, useUser } from "../provider/hooks"
import { ActiveUsersSkeleton } from "./skeleton"

type ActiveUsersProps = {
  selectedUserId: number | null
  setSelectedUserId: Dispatch<SetStateAction<number | null>>
  setShowDrawer: Dispatch<SetStateAction<boolean>>
}

type ActiveUsersType = {
  id: number
  username: string
  profileImgUrl: string
}

const ActiveUsers = ({
  selectedUserId,
  setSelectedUserId,
  setShowDrawer,
}: ActiveUsersProps) => {
  const [loading, setLoading] = useState(true)

  const [user] = useUser()

  const [activeUsers, setActiveUsers] = useState<ActiveUsersType[]>([])

  const socket = useSocket()

  const selectedUserClickHandler = (userId: number) => {
    setSelectedUserId(() => userId)
  }

  useEffect(() => {
    socket.on("active_users", (users) => {
      setActiveUsers([
        ...users.filter(({ id }: { id: number }) => id !== user?.id),
      ])
      setLoading(false)
    })

    return () => {
      socket.off("active_users")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loading ? (
    <ActiveUsersSkeleton />
  ) : (
    <div className="mt-12" onClick={() => setShowDrawer(true)}>
      <h1 className="mb-4 text-2xl font-bold text-light-100">Active Users</h1>
      <ul className="flex overflow-auto">
        {activeUsers?.length > 0 ? (
          activeUsers.map(({ id, username }) => (
            <li
              onClick={() => selectedUserClickHandler(id)}
              key={id}
              className={`flex flex-col items-center shrink-0 p-4 hover:bg-dark-60 ${
                selectedUserId === id ? "bg-dark-60" : ""
              } rounded-[10px] cursor-pointer mr-1`}
            >
              <div>
                <Image
                  alt={`${username}'s profile image'`}
                  className="rounded-full"
                  src={"/unnamed.png"}
                  width={48}
                  height={48}
                />
              </div>
              <p className="text-xs text-center text-light-40">{username}</p>
            </li>
          ))
        ) : (
          <div className="w-full flex flex-col p-8 items-center bg-dark-100 rounded-[10px]">
            <Image
              alt="no active user"
              src="/illustrations/2.png"
              width="48"
              height="48"
            />
            <p className="text-lg font-bold text-center text-light-100 ">
              No other user is active now
            </p>
          </div>
        )}
      </ul>
    </div>
  )
}

export default ActiveUsers
