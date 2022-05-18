import { AxiosRequestConfig, AxiosRequestHeaders } from "axios"
import apiService from "../utils/api"


export const createUser = async (username: string, password: string) => {
    try {
        const response = await apiService().post("/users", {
            username,
            password
        })

        if(!response.data.success) {
            throw new Error("Something went wrong!")
        }

        return [response, null]

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

export const authenticateUser = async (username: string, password: string) => {
    try {
        const response = await apiService().post("/users/authenticate", {
            username,
            password
        })

        return [response, null]

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


export const getCurrentUser = async(config?: AxiosRequestHeaders) => {
    try {
        const response = await apiService().get("/users", {
            headers: {
                ...config
            }
        })

        return [response.data.user, null]

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



