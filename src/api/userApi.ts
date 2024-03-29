import axiosClient from './axiosClient'
import axios from 'axios'

import type { TypeRegister } from '../pages/Register'
import type { TypeLogin } from '../pages/Login'

const userApi = {
    login: async (info: TypeLogin) => {
        const url = '/login'
        //console.log(info)
        let temp = JSON.stringify(info)
        //console.log(temp)
        return await axiosClient.post(url, temp)
    },
    register: (info: TypeRegister) => {
        const url = '/register'
        let temp = JSON.stringify(info)
        return axiosClient.post(url, temp)
    },
    changePassword: (password: any) => {
        const url = '/changePassword'
        let temp = JSON.stringify(password)
        return axiosClient.post(url, temp)
    },
    forgotPassword: (email: any) => {
        const url = '/resetPassword'
        let temp = JSON.stringify(email)
        return axiosClient.post(url, temp)
    },
    restorePassword: (data: any, search: any) => {
        let tk = search.slice(7, search.length)
        //console.log(tk)
        const url = `/restorePassword?token=${tk}`
        let temp = JSON.stringify(data)
        return axiosClient.post(url, temp)
    },
    saveComment: (data: any) => {
        const url = `/comments`
        let temp = JSON.stringify(data)
        return axiosClient.post(url, temp)
    }
}

async function logOut(token: any) {
    const baseUrl = import.meta.env.SNOWPACK_PUBLIC_APP_API_URL
    const url = `${baseUrl}logout`
    let accessToken = localStorage.getItem('accessToken')
    accessToken = 'Bearer ' + accessToken
    //delete {data: {token: "asdasd"}}
    const res: any = await axios.delete(url, {
        data: token,
        headers: { Authorization: accessToken },
    })
    //console.log(res)
    return res
}

export default userApi
export { logOut }
