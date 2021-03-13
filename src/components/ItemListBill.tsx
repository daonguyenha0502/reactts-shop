import React from 'react'
import type { TypeBill } from '../pages/Profile'
import type { TypeItemCart } from 'src/stores/cartsSlice'

interface Props {
    bill: TypeBill
}

const getTotalPrice = (items: TypeItemCart[]) =>
    items.reduce(
        (ack: number, item) =>
            ack +
            item.cartAmount *
            (item.price -
                Math.ceil(((item.price / 10000) * item.sale) / 100) *
                10000),
        0,
    )

const ItemListBill = ({ bill }: Props) => {
    const cart: TypeItemCart[] = JSON.parse(bill.cart)
    return (
        <div className=" border-black border rounded-md mb-2">
            <div className="flex-row lg:flex justify-between p-2 mb-4"><p className="text-sm lg:text-base">Ngày 7 Tháng 5 Năm 2020 - 11 Giờ 14 Phút</p>
                <p className="text-sm lg:text-base">Mã HĐ: {bill._id}</p>
            </div>
            {cart.map((item) =>
                (<div key={item._id} className="flex-row lg:flex justify-between p-2 w-11/12 border-black border mx-auto rounded-sm mb-1">
                    <p className="text-sm lg:text-base">{item.name} || Số lượng: {item.cartAmount}</p>
                    <p className="text-sm lg:text-base">{item.price} d</p>
                </div>)
            )}

            <div className="flex-row lg:flex justify-between p-2 w-11/12 border-black border mx-auto rounded-sm mb-1">
                <p className="text-sm lg:text-base">Người nhận: {bill.name}
                </p>
                <p className="text-sm lg:text-base">SĐT: {bill.phone}</p>
            </div>
            <div className="flex-row lg:flex justify-between p-2 w-11/12 border-black border mx-auto rounded-sm mb-1">
                <p className="text-sm lg:text-base">Địa chỉ: {bill.address}
                </p>
            </div>
            <div className="flex-row lg:flex justify-between bg-gray-400 border-black border-t rounded-b-md p-2 mt-4"><div>Giá: {getTotalPrice(cart).toLocaleString('es-US')}đ</div>
                <p className="text-sm lg:text-base text-yellow-600">{bill.statePayment}</p>
                <p className="text-sm lg:text-base text-green-800">{bill.typePayment}</p>
                {/* <p className="text-sm lg:text-base">Chưa thanh toán</p> */}
            </div>
        </div>
    )
}

export default ItemListBill
