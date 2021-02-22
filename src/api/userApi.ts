import axiosClient from "./axiosClient";

const userApi = {
    login: (info: any) => {
        const url = '/login';
        console.log(info)
        return axiosClient.post(url, info);
    },
    register: (info: any) => {
        const url = '/register';
        console.log(info)
        return axiosClient.post(url, info);
    }
}

export default userApi;