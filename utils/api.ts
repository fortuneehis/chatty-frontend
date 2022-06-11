import axios, { AxiosRequestConfig, CancelToken } from "axios"
import config from "./config"


const APIService = (cancelToken?: CancelToken) => {
    return axios.create({
        withCredentials: true,
        cancelToken,
        baseURL: config.SERVER_URL as string
    })
}


export default APIService