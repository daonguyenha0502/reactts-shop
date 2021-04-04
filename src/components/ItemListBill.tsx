import React from 'react'
import type { TypeBill } from '../pages/Profile'
import type { TypeItemCart } from '../stores/cartsSlice'
import { useTypeSafeTranslation } from '../utility/useTypeSafeTranslation';


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
    const { t } = useTypeSafeTranslation()
    function getDetailTime(date: string) {
        let newDate = new Date(date);
        let time = t('profile.itemListBill.day') + newDate.getDate() + t('profile.itemListBill.month') + (newDate.getMonth() + 1) + t('profile.itemListBill.year') + newDate.getFullYear() + ' - ' + newDate.getHours() + t('profile.itemListBill.hour') + newDate.getMinutes() + t('profile.itemListBill.minute')
        return time
    }
    return (
        <div className=" border-black dark:border-white dark:text-gray-200 text-black border rounded-md mb-2">
            <div className="flex-row lg:flex justify-between p-2 mb-4"><p className="text-sm lg:text-base">{getDetailTime(bill.date)}</p>
                <p className="text-sm lg:text-base">{t('profile.itemListBill.code')}: {bill._id}</p>
            </div>
            {cart.map((item) =>
                (<div key={item._id} className="flex-row lg:flex justify-between p-2 w-11/12 border-black border mx-auto rounded-sm mb-1">
                    <p className="text-sm lg:text-base">{item.name} || {t('profile.itemListBill.amount')}: {item.cartAmount}</p>
                    <p className="text-sm lg:text-base">{item.price} {t('profile.itemListBill.currency')}</p>
                </div>)
            )}

            <div className="flex-row lg:flex justify-between p-2 w-11/12 border-black dark:border-white border mx-auto rounded-sm mb-1">
                <p className="text-sm lg:text-base">{t('profile.itemListBill.receiver')}: {bill.name}
                </p>
                <p className="text-sm lg:text-base">{t('profile.itemListBill.phone')}: {bill.phone}</p>
            </div>
            <div className="flex-row lg:flex justify-between p-2 w-11/12 border-black dark:border-white border mx-auto rounded-sm mb-1">
                <p className="text-sm lg:text-base">{t('profile.itemListBill.address')}: {bill.address}
                </p>
            </div>
            <div className="flex-row lg:flex justify-between bg-gray-400 dark:bg-gray-800 border-black dark:border-white border-t rounded-b-md p-2 mt-4"><div>{t('profile.itemListBill.price')}: {getTotalPrice(cart).toLocaleString('es-US')}{t('profile.itemListBill.currency')}</div>
                <p className="text-sm lg:text-base text-yellow-600 dark:text-yellow-500">{bill.statePayment}</p>
                <p className="text-sm lg:text-base text-green-800 dark:text-green-500">{bill.typePayment}</p>
                {/* <p className="text-sm lg:text-base">Chưa thanh toán</p> */}
            </div>
        </div>
    )
}

export default ItemListBill
