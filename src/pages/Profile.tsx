import React, { useEffect, useState } from 'react'
import ItemListBill from '../components/ItemListBill'

import checkOutApi from '../api/checkOutApi'

interface Props { }

export interface TypeBill {
    date: string
    id: string
    nameProduct: string
    amount: number
    price: number
    fullName: string
    phone: string
    address: string
    status: string
    typePayment: string

}

const Profile = (props: Props) => {
    const [listBills, setListBills] = useState<TypeBill[] | []>([])
    useEffect(() => {
        const getBills = async () => {
            const response = await checkOutApi.getAllBills()
            if (response.status === 200) {
                setListBills(response.data)
            } else {
                console.log('error')
            }
        }
        getBills()
    }, [])
    return (
        <div className="my-12 px-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl text-red-500">My Profile</h1>
                <button className="bg-red-500 px-4 h-10 py-2 rounded-md outline-none focus:outline-none text-white hover:bg-blue-700">Change password</button>
            </div>
            <hr className="text-xs" />
            <div className="py-4 w-11/12 md:w-4/5 xl:w-3/4 mx-auto">
                {listBills.length > 0 ? (listBills as TypeBill[]).map((bill: TypeBill) =>
                    <ItemListBill key={bill.id} bill={bill} />
                ) : <><h1 className="text-lg text-red-600">You don't buy anything?</h1></>}
            </div>
        </div>
    )
}

export default Profile
