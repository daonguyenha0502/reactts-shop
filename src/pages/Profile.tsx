import React from 'react'
import ItemListBill from '../components/ItemListBill'

interface Props { }

const Profile = (props: Props) => {
    return <div className="my-12 px-4">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl text-red-500">My Profile</h1>
            <button className="bg-red-500 px-4 h-10 py-2 rounded-md outline-none focus:outline-none text-white hover:bg-blue-700">Change password</button>
        </div>
        <hr className="text-xs" />
        <div className="py-4 w-11/12 md:w-4/5 xl:w-3/4 mx-auto">
            <ItemListBill />
        </div>
    </div>
}

export default Profile
