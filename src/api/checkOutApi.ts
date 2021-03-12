import axiosClient from './axiosClient'

const checkOutApi = {
    saveBill: (bill: any) => {
        console.log(bill)
        const url = `/bills`
        let temp = JSON.stringify(bill)
        return axiosClient.post(url, temp)
    },
    getAllBills: () => {},
}

export default checkOutApi
