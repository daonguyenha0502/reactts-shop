import axiosClient from './axiosClient'

const carouselApi = {
    getAll: () => {
        const url = `/carousels`
        return axiosClient.get(url)
    },
    saveCarousel: (body: any) => {
        let temp = JSON.stringify(body)
        const url = `/carousels`
        return axiosClient.post(url, temp)
    },
}

export default carouselApi
