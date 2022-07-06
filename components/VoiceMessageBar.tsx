const VoiceMessageBar = () => {
  return (
    <div className="flex justify-evenly w-full bg-dark-60 p-2 md:p-4 rounded-[10px]">
      <div className="p-1 mr-2 md:mr-4 active:bg-dark-100 hover:bg-dark-100 rounded-[10px] cursor-pointer">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.0001 21.3333C18.9414 21.3333 21.3334 18.9413 21.3334 16V8.00001C21.3334 5.04401 18.9534 2.63867 16.0281 2.63867C15.9342 2.63924 15.8407 2.65042 15.7494 2.67201C14.3804 2.73838 13.0893 3.32848 12.1433 4.32021C11.1972 5.31194 10.6686 6.6294 10.6667 8.00001V16C10.6667 18.9413 13.0587 21.3333 16.0001 21.3333Z"
            fill="#0065CA"
          />
          <path
            d="M14.6666 26.5747V29.3333H17.3333V26.5747C22.5853 25.9147 26.6666 21.4307 26.6666 16H23.9999C23.9999 20.412 20.4119 24 15.9999 24C11.5879 24 7.99992 20.412 7.99992 16H5.33325C5.33325 21.4293 9.41459 25.9147 14.6666 26.5747Z"
            fill="#0065CA"
          />
        </svg>
      </div>
      <div className="flex-1 flex justify-center items-center bg-primary-100 rounded-[10px]">
        <p className="font-bold text-light-100">00:18</p>
      </div>
      <div className="p-1 ml-2 md:ml-4 active:bg-dark-100 hover:bg-dark-100 rounded-[10px] cursor-pointer">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.0001 21.3333C18.9414 21.3333 21.3334 18.9413 21.3334 16V8.00001C21.3334 5.04401 18.9534 2.63867 16.0281 2.63867C15.9342 2.63924 15.8407 2.65042 15.7494 2.67201C14.3804 2.73838 13.0893 3.32848 12.1433 4.32021C11.1972 5.31194 10.6686 6.6294 10.6667 8.00001V16C10.6667 18.9413 13.0587 21.3333 16.0001 21.3333Z"
            fill="#0065CA"
          />
          <path
            d="M14.6666 26.5747V29.3333H17.3333V26.5747C22.5853 25.9147 26.6666 21.4307 26.6666 16H23.9999C23.9999 20.412 20.4119 24 15.9999 24C11.5879 24 7.99992 20.412 7.99992 16H5.33325C5.33325 21.4293 9.41459 25.9147 14.6666 26.5747Z"
            fill="#0065CA"
          />
        </svg>
      </div>
    </div>
  )
}

export default VoiceMessageBar
