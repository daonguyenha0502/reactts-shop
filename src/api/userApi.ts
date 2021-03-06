import axiosClient from './axiosClient'
import axios from 'axios'

import type { TypeRegister} from '../pages/Register'
import type { TypeLogin} from '../pages/Login'

const userApi = {
    login: (info: TypeLogin) => {
        const url = '/login'
        //console.log(info)
        let temp = JSON.stringify(info)
        //console.log(temp)
        return axiosClient.post(url, temp)
    },
    register: (info: TypeRegister) => {
        const url = '/register'
        let temp = JSON.stringify(info)
        return axiosClient.post(url, temp)
    },
    
}
function logOut(token: any){
    const baseUrl = import.meta.env.SNOWPACK_PUBLIC_APP_API_URL;
    const url = `${baseUrl}logout`
    let accessToken =  localStorage.getItem('accessToken')
    accessToken = "Bearer "+accessToken
    //delete {data: {token: "asdasd"}}
    axios.delete(url, {data:token, headers:{Authorization: accessToken}}).then(function (response: any) {
        //console.log(response.data);
    })
    .catch(function (error) {
        console.log(error)
    })
}

export default userApi
export {logOut}
