import axiosClient from './axiosClient'

const userApi = {
    login: (info: any) => {
        const url = '/login'
        //console.log(info)
        return axiosClient.post(url, info)
    },
    register: (info: any) => {
        const url = '/register'
        //console.log(info)
        return axiosClient.post(url, info)
    },
    logOut: (info: any) => {
        const url = '/logout'
        //console.log(info)
        return axiosClient.delete(url, info)
    }
}

export default userApi
