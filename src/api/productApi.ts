import axiosClient from "./axiosClient";

const productApi = {
    getAll: (params: any) => {
        const url = '/products';
        return axiosClient.get(url, { params: params });
    },

    get: (id: string) => {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    searchProduct: (name: string) => {
        const url = `/search?q=${name}`
        return axiosClient.get(url);
    },
    searchByType: (type: string) => {
        const url = `/search/${type}`
        return axiosClient.get(url);
    }
}

export default productApi;