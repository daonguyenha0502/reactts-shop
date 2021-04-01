import React, { useEffect, useState } from 'react'
import ItemListBill from '../components/ItemListBill'

import checkOutApi from '../api/checkOutApi'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import type { TypeResponse } from '../api/axiosClient'
import Loading from '../components/Skeleton/Loading'

interface Props { }

export interface TypeBill {
    date: string
    _id: string
    cart: string
    name: string
    phone: string
    address: string
    statePayment: string
    typePayment: string
    email: string

}

const Profile = (props: Props) => {
    const [listBills, setListBills] = useState<TypeBill[] | []>([])
    const [isLoading, setIsLoading] = useState<boolean | true>(true)
    useEffect(() => {
        const getBills = async () => {
            setIsLoading(true)
            try {
                const response: TypeResponse = await checkOutApi.getAllBills()
                if (response.data) {
                    setListBills(response.data)
                    setIsLoading(false)
                } else {
                    console.log('error')
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        }
        getBills()
    }, [])
    return (
        <>
            <Helmet>
                <title>Profile</title>
                <link rel="canonical" href="https://cpt-ha.web.app" />
            </Helmet>
            <div className="my-12 px-4">

                <div className="flex justify-between items-center">
                    <h1 className="text-3xl text-red-500">My Profile</h1>
                    <Link to="/changePassword"><button className="bg-red-500 px-4 h-10 py-2 rounded-md outline-none focus:outline-none text-white hover:bg-blue-700">Change password</button></Link>
                </div>
                <hr className="text-xs" />
                <div className="py-4 w-11/12 md:w-4/5 xl:w-3/4 mx-auto">
                    {isLoading ? <Loading /> : listBills.length > 0 ? (listBills as TypeBill[]).map((bill: TypeBill) =>
                        <ItemListBill key={bill._id} bill={bill} />
                    ) : <><h1 className="text-lg text-red-600">You don't buy anything?</h1></>}
                </div>
            </div>
        </>
    )
}

export default Profile
