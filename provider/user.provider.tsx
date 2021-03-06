import Image from "next/image"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import toast from "react-hot-toast"
import { UserService } from "../services"
import { User } from "../types"

export const UserContext = createContext<
  [user: User | null, setUser: Dispatch<SetStateAction<User | null>>] | null
>(null)

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getCurrentUser = async () => {
      const [currentUser, error] = await UserService.getCurrentUser()

      if (error) {
        toast.error(error, {
          duration: 15000,
        })
      }

      setUser(currentUser.data)
    }
    if (!user) {
      getCurrentUser()
    }
  }, [user])

  return user ? (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  ) : (
    <div className="flex flex-col items-center">
      <div>
        <Image
          alt="loading user data"
          src="/illustrations/5.png"
          width={100}
          height={100}
        />
      </div>
      <p className="font-bold text-light-100">Loading user data...</p>
    </div>
  )
}

export default UserProvider
