import React from 'react'
import type { TypeItemCart } from '../../stores/cartsSlice'
import type { RootState } from '../../stores/store'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTypeSafeTranslation } from '../../utility/useTypeSafeTranslation'

interface Props {
    cartItems: TypeItemCart[]
}

const getTotalItems = (items: TypeItemCart[]) =>
    items.reduce((ack: number, item) => ack + item.cartAmount, 0)

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

const Checkout = ({ cartItems }: Props) => {
    const user = useSelector((state: RootState) => state.users)
    const { t } = useTypeSafeTranslation()
    const handleClick = () => {
        toast.warning(`${t('cart.message.warn')}`, {
            position: 'bottom-center',
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
    const handleClickCheckOut = () => {
        toast.warn(
            `${t('cart.message.empty')}`,
            {
                position: 'bottom-center',
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            },
        )
    }
    return (
        <div className="w-92 sm:w-120 bg-indigo-400 py-4 rounded-md leading-8">
            <div className="flex justify-between px-2">
                <p>{t('cart.all')}({getTotalItems(cartItems)} {t('cart.item')})</p>{' '}
                <p>{getTotalPrice(cartItems)} {t('cart.currency')}</p>
            </div>
            <div className="flex justify-between px-2">
                <p>{t('cart.delivery')}</p>
                <p>{t('cart.free')}</p>
            </div>
            <div className="flex justify-between px-2">
                <p>{t('cart.tax')}</p> {t('cart.inPrice')}
            </div>

            <div className="flex justify-between px-2">
                <p>{t('cart.total')}</p> {getTotalPrice(cartItems)} {t('cart.currency')}
            </div>
            {cartItems.length > 0 ? (
                user.accessToken ? (
                    <Link to="/checkout">
                        <button className="bg-blue-600 px-5 py-1 rounded-md hover:bg-red-400 active:bg-red-500 duration-500 focus:outline-none">
                            {t('cart.checkout')}
                        </button>
                    </Link>
                ) : (
                        <Link to="/login">
                            <button
                                onClick={handleClick}
                                className="bg-blue-600 px-5 py-1 rounded-md hover:bg-red-400 active:bg-red-500 duration-500 focus:outline-none"
                            >
                                {t('cart.checkout')}
                            </button>
                        </Link>
                    )
            ) : (
                    <Link to="/">
                        <button
                            onClick={handleClickCheckOut}
                            className="bg-blue-600 px-5 py-1 rounded-md hover:bg-red-400 active:bg-red-500 duration-500 focus:outline-none"
                        >
                            {t('cart.checkout')}
                        </button>
                    </Link>
                )}
        </div>
    )
}

export default Checkout
