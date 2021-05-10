import React from 'react'
import type { TypeItemCart } from '../../stores/cartsSlice'
import type { TypeCheckout } from '../../pages/CheckOut'
import clsx from 'clsx'
import { useTypeSafeTranslation } from '../../utility/useTypeSafeTranslation'

interface Props {
    carts: TypeItemCart[]
    stateCheckout: TypeCheckout
}

const ListProductOnCheckout = ({ carts, stateCheckout }: Props) => {
    const { t } = useTypeSafeTranslation()
    return (
        <div
            className={clsx(
                stateCheckout !== 'VIEW_CART' &&
                    'bg-gray-200 dark:bg-gray-700 opacity-50 w-full pt-4 rounded-lg select-none',
            )}
        >
            <div className="mx-auto overflow-y-auto h-1/2 xl:h-5/6 max-w-min mb-4">
                {carts.map((item) => (
                    <div
                        key={item._id}
                        className="w-80 sm:w-100 h-auto border-gray-800 dark:border-gray-200 border rounded-lg leading-5 mb-8"
                    >
                        <div className="flex h-18">
                            <img
                                style={{ width: '3.5rem', height: '4.7rem' }}
                                className="border-gray-800 dark:border-gray-200 dark:filter-brightness-80 border-r py-2 rounded-md"
                                //width="150px"
                                //height="auto"
                                src={item.img}
                                alt="item"
                            />
                            <div className="flex-row text-black dark:text-gray-200 text-center w-full py-2 relative self-center">
                                <div className="flex mx-4 text-center text-sm sm:text-base font-bold space-x-4">
                                    <p>
                                        {t('checkout.amount')}:{' '}
                                        {item.cartAmount}
                                    </p>
                                    <p className="text-red-700 dark:text-red-600">
                                        {t('checkout.discounted')}:{' '}
                                        {(
                                            item.cartAmount *
                                            (item.price -
                                                Math.ceil(
                                                    ((item.price / 10000) *
                                                        item.sale) /
                                                        100,
                                                ) *
                                                    10000)
                                        ).toLocaleString()}{' '}
                                        {t('checkout.currency')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListProductOnCheckout
