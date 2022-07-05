import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSocket, useUser } from "../provider/hooks";
import { UserService } from "../services";
import ActiveUsers from "./ActiveUsers";
import Chats from "./Chats";
import MiniProfile from "./MiniProfile";
import SearchBar from "./SearchBar";
import { MiniProfileSkeleton } from "./skeleton";

type SidebarProps = {
  selectedUserId: number | null;
  setSelectedUserId: Dispatch<SetStateAction<number | null>>;
  showDrawer: boolean;
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
  setShowChatboxDrawer: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({
  selectedUserId,
  setSelectedUserId,
  setShowChatboxDrawer,
}: SidebarProps) => {
  const [user, setUser] = useUser();
  const socket = useSocket();
  const router = useRouter();

  useEffect(() => {
    socket.on(`user_status:${user?.id}`, (status) => {
      if (user) {
        setUser({
          ...user,
          status,
        });
      }
    });

    return () => {
      socket.off(`user_status:${user?.id}`);
    };
  }, []);

  return (
    <aside className="w-full md:w-2/4 md:z-50 overflow-y-auto col-start-1 col-end-5 md:fixed md:top-0 md:left-0 lg:relative lg:w-full lg:col-start-1 lg:col-end-5 h-full bg-dark-80 md:rounded-[10px] p-4 xl:p-8 z-[2]">
      {user !== null ? (
        <div className="flex items-center justify-between">
          <MiniProfile
            profileImg={user?.profileImg ?? "/unnamed(2).jpg"}
            username={user?.username!}
            status={user.status.toLowerCase()}
          />
          <div
            onClick={async () => {
              const [data, error] = await UserService.logUserOut();

              if (error) {
                toast.error(error.message, {
                  duration: 15000,
                });
              }
              console.log(data);
              if (data?.success) {
                toast.success(data.message);
                socket.disconnect();
                router.push("/login");
              }
            }}
            className="p-2 ml-1 active:bg-dark-100 hover:bg-dark-100 rounded-[10px] cursor-pointer"
          >
            <p className="text-primary-100">
              <svg
                className="inline-block"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 5C3 3.9 3.9 3 5 3H13V5H5V19H13V21H5C3.9 21 3 20.1 3 19V5ZM17.176 11L14.64 8.464L16.054 7.05L21.004 12L16.054 16.95L14.64 15.536L17.176 13H10.59V11H17.176Z"
                  fill="#0065ca"
                />
              </svg>
              Logout
            </p>
          </div>
        </div>
      ) : (
        <MiniProfileSkeleton />
      )}
      <SearchBar
        setShowChatboxDrawer={setShowChatboxDrawer}
        setSelectedUserId={setSelectedUserId}
        selectedUserId={selectedUserId}
      />
      <ActiveUsers
        setShowDrawer={setShowChatboxDrawer}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />
      <Chats
        setShowChatboxDrawer={setShowChatboxDrawer}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />
    </aside>
  );
};

export default Sidebar;
