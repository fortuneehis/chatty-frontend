import apiService from "../utils/api"


export const fetchChats = async () => {
    try {
        const response = await apiService().get("/chats")

        const {chats} = response.data

        return [chats, null]

    } catch(err: any) {
        if(err.response) {
            return [null, err.response.data]
        }

        if(err.request) {
            return [null, err.request]
        }
        
        return [null, err]
        
    }
}

export const fetchChat = async(id: number) => {
    try {
        const response = await apiService().get(`/chats?user_id=${id}`)

        console.log(response.data.data)

        return [response.data.data, null]

    } catch(err: any) {
        if(err.response) {
            return [null, err.response.data]
        }

        if(err.request) {
            return [null, err.request]
        }
        
        return [null, err]
        
    }
}