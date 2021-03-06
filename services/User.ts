import { AxiosRequestHeaders } from "axios"
import apiService from "../utils/api"

export const createUser = async (username: string, password: string) => {
  try {
    const response = await apiService().post("/users", {
      username,
      password,
    })
    alert(response)
    return [response, null]
  } catch (err: any) {
    alert(err)
    if (err.response) {
      return [null, err.response.data]
    }

    if (err.request) {
      return [null, err.request]
    }

    return [null, err]
  }
}

export const authenticateUser = async (username: string, password: string) => {
  try {
    const response = await apiService().post("/users/authenticate", {
      username,
      password,
    })

    return [response, null]
  } catch (err: any) {
    if (err.response) {
      return [null, err.response.data]
    }

    if (err.request) {
      return [null, err.request]
    }

    return [null, err]
  }
}

export const getCurrentUser = async (config?: AxiosRequestHeaders) => {
  try {
    const response = await apiService().get("/users", {
      headers: {
        ...config,
      },
      withCredentials: true,
    })

    return [response.data.user, null]
  } catch (err: any) {
    if (err.response) {
      return [null, err.response.data]
    }

    if (err.request) {
      return [null, err.request]
    }

    return [null, err]
  }
}

export const fetchUser = async (id: number) => {
  try {
    const response = await apiService().get(`/users/${id}`)

    return [response.data.user, null]
  } catch (err: any) {
    if (err.response) {
      return [null, err.response.data]
    }

    if (err.request) {
      return [null, err.request]
    }

    return [null, err]
  }
}

export const searchUsers = async (username: string) => {
  try {
    const response = await apiService().get(
      `/users/search?username=${username}`
    )

    return [response.data, null]
  } catch (err: any) {
    if (err.response) {
      return [null, err.response.data]
    }

    if (err.request) {
      return [null, err.request]
    }

    return [null, err]
  }
}

export const logUserOut = async () => {
  try {
    const response = await apiService().post(`/users/logout`)
    return [response.data, null]
  } catch (err: any) {
    if (err.response) {
      return [null, err.response.data]
    }

    if (err.request) {
      return [null, err.request]
    }

    return [null, err]
  }
}
