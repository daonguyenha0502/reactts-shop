import axiosClient from './axiosClient'

const blogApi = {
    getAll: () => {
        const url = `/carousel`
        return axiosClient.get(url)
    },
    getOne: (id: any) => {
        console.log(id)
        const url = `/carousel/${id}`
        return axiosClient.get(url)
    },
    postOne: (blog: any)=>{
        const url = `/carousel`
        return axiosClient.post(url, blog)
    }
}

export default blogApi
