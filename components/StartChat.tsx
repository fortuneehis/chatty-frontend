import Image from "next/image";

const StartChat = () => {
  return (
    <div className="fixed rounded-[10px] bg-dark-80 text-center top-0 z-[1] w-full h-full md:relative md:col-start-1 md:col-end-9 lg:col-start-5 flex items-center justify-center flex-col lg:col-end-13">
      <div>
        <Image src="/illustrations/1.png" width={150} height={150} />
      </div>
      <p className="text-2xl font-bold text-light-100">Start a chat</p>
    </div>
  );
};

export default StartChat;
