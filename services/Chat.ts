import apiService from "../utils/api"


export const fetchChats = async () => {
    try {
        const response = await apiService().get("/chats")

        const {chats} = response.data

        return [chats, null]

    } catch(err: any) {
        if(err.request) {
            return [null, err.request]
        }
        
        if(err.response) {
            return [null, err.response]
        }
        
        return [null, err]
        
    }
}