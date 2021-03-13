import React from 'react'
import type { TypeBill } from '../pages/Profile'

interface Props {
    bill: TypeBill
}

const ItemListBill = ({ bill }: Props) => {
    return (
        <div className=" border-black border rounded-md">
            <div className="flex-row lg:flex justify-between p-2 mb-4"><p className="text-sm lg:text-base">Ngày 7 Tháng 5 Năm 2020 - 11 Giờ 14 Phút</p>
                <p className="text-sm lg:text-base">Mã HĐ: {bill.id}</p>
            </div>
            <div className="flex-row lg:flex justify-between p-2 w-11/12 border-black border mx-auto rounded-sm mb-1">
                <p className="text-sm lg:text-base">{bill.nameProduct} || Số lượng: {bill.amount}</p>
                <p className="text-sm lg:text-base">{bill.price} d</p>
            </div>
            <div className="flex-row lg:flex justify-between p-2 w-11/12 border-black border mx-auto rounded-sm mb-1">
                <p className="text-sm lg:text-base">Người nhận: {bill.fullName}
                </p>
                <p className="text-sm lg:text-base">SĐT: {bill.phone}</p>
            </div>
            <div className="flex-row lg:flex justify-between p-2 w-11/12 border-black border mx-auto rounded-sm mb-1">
                <p className="text-sm lg:text-base">Địa chỉ: {bill.address}
                </p>
            </div>
            <div className="flex-row lg:flex justify-between bg-gray-400 border-black border-t rounded-b-md p-2 mt-4"><div>Giá: 67,640,000đ - Phí Ship: 0 đ</div>
                <p className="text-sm lg:text-base text-yellow-600">{bill.status}</p>
                <p className="text-sm lg:text-base text-green-800">{bill.typePayment}</p>
                {/* <p className="text-sm lg:text-base">Chưa thanh toán</p> */}
            </div>
        </div>
    )
}

export default ItemListBill
