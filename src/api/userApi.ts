import axiosClient from './axiosClient'

import type { TypeRegister} from '../pages/Register'
import type { TypeLogin} from '../pages/Login'

const userApi = {
    login: (info: TypeLogin) => {
        const url = '/login'
        //console.log(info)
        let temp = JSON.stringify(info)
        return axiosClient.post(url, temp)
    },
    register: (info: TypeRegister) => {
        const url = '/register'
        let temp = JSON.stringify(info)
        return axiosClient.post(url, temp)
    },
    logOut: (id: any) => {
        const url = '/logout'
        //console.log(info)
        return axiosClient.delete(url, id)
    }
}

export default userApi
