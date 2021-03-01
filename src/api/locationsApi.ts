import axiosClient from './axiosClient'

const locationsApi = {
    getListCity: () => {
        const url = `/locations`
        return axiosClient.get(url)
    },
    getListDistrict: (idCity: any) => {
        const url = `/locations/${idCity}`
        //console.log(idCity)
        return axiosClient.get(url)
    },
    getListWard: (idCity: any, idDistrict: any) => {
        const url = `/locations/${idCity}/${idDistrict}`
        //console.log(idDistrict)
        return axiosClient.get(url)
    },
    // getWard: (idCity: any, idDistrict: any, idWard: any) => {
    //     const url = `/locations/${idCity}/${idDistrict}/${idWard}`;
    //     //console.log(idWard)
    //     return axiosClient.get(url);
    // }
}

export default locationsApi
