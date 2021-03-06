import axiosClient from './axiosClient'

const blogApi = {
    getOne: (alias: any) => {
        console.log(alias)
        const url = `/blog/${alias}`
        return axiosClient.get(url)
    },
    postOne: (blog: any)=>{
        let temp = JSON.stringify(blog)
        const url = `/blog`
        return axiosClient.post(url, temp)
    }
}

export default blogApi
