import React from 'react'
import type { itemType } from '../App'
import type { RootState } from '../stores/store'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

interface Props {
    cartItems: itemType[]
}

const getTotalItems = (items: itemType[]) =>
    items.reduce((ack: number, item) => ack + item.cartAmount, 0)

const getTotalPrice = (items: itemType[]) =>
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
    const handleClick = () => {
        toast.warning(`Please login or register to checkout!`, {
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
            `Cart is empty!
        Please buy something!`,
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
                <p>Subtotal({getTotalItems(cartItems)} items)</p>{' '}
                <p>{getTotalPrice(cartItems)}</p>
            </div>
            <div className="flex justify-between px-2">
                <p>Delivery</p>
                <p>Free</p>
            </div>
            <div className="flex justify-between px-2">
                <p>Taxes and feesTaxes and fees</p> — —
            </div>

            <div className="flex justify-between px-2">
                <p>Est. total</p> {getTotalPrice(cartItems)}
            </div>
            {cartItems.length > 0 ? (
                user.accessToken ? (
                    <Link to="/checkout">
                        <button className="bg-blue-600 px-5 py-1 rounded-md hover:bg-red-400 active:bg-red-500 duration-500 focus:outline-none">
                            Check out
                        </button>
                    </Link>
                ) : (
                    <Link to="/login">
                        <button
                            onClick={handleClick}
                            className="bg-blue-600 px-5 py-1 rounded-md hover:bg-red-400 active:bg-red-500 duration-500 focus:outline-none"
                        >
                            Check out
                        </button>
                    </Link>
                )
            ) : (
                <Link to="/">
                    <button
                        onClick={handleClickCheckOut}
                        className="bg-blue-600 px-5 py-1 rounded-md hover:bg-red-400 active:bg-red-500 duration-500 focus:outline-none"
                    >
                        Check out
                    </button>
                </Link>
            )}
        </div>
    )
}

export default Checkout
