import React from 'react'
import type { TypeItemCart } from '../../stores/cartsSlice'
import { useTypeSafeTranslation } from '../../utility/useTypeSafeTranslation'

interface Props {
    item: TypeItemCart
    onAdd: (item: TypeItemCart) => void
    onReducer: (product: TypeItemCart) => void
    onRemoveFromCart: (product: TypeItemCart) => void
}

const ItemCart = ({ item, onAdd, onReducer, onRemoveFromCart }: Props) => {
    const { t } = useTypeSafeTranslation()
    return (
        <div className="w-92 sm:w-120 h-auto border-gray-800 border rounded-lg leading-5 mb-8">
            <div className="flex min-h-32">
                <img
                    className="border-gray-800 w-28 h-auto border-r py-2 rounded-l-md"
                    //width="150px"
                    //height="auto"
                    src={item.img}
                    alt=""
                />
                <div className="flex-row text-center w-full py-2 relative">
                    <div className="flex mx-4">
                        <p className="text-center text-sm sm:text-base font-bold">
                            {item.name}
                        </p>
                        <button
                            onClick={() => onRemoveFromCart(item)}
                            className="ml-auto bg-transparent mb-3 border-0 outline-none focus:outline-none"
                        >
                            <span className="bg-transparent text-red-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                            </span>
                        </button>
                    </div>

                    <div className="flex space-x-4 mb-12 w-full justify-center">
                        <p>
                            {t('cart.price')}:{' '}
                            {(item.cartAmount * item.price).toLocaleString()}{' '}
                            {t('cart.currency')}
                        </p>
                        <p className="text-red-700">{t('cart.sale')}: {item.sale}%</p>
                    </div>

                    <div className="flex w-full justify-center absolute bottom-2">
                        <button
                            className="px-7 rounded-md py-1 focus:outline-none bg-blue-600 hover:bg-blue-500 text-xl "
                            onClick={() => onReducer(item)}
                        >
                            -
                        </button>
                        <p className="px-5 py-1">{`< ${item.cartAmount} >`}</p>
                        <button
                            className="px-7 rounded-md py-1 focus:outline-none bg-red-600 hover:bg-red-500 text-xl"
                            onClick={() => onAdd(item)}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCart
