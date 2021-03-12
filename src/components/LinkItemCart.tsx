import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import type { itemType } from '../App'
import type { TypeItemCart } from '../stores/cartsSlice'

interface Props {
    cartItems: TypeItemCart[]
}

const LinkItemCart = ({ cartItems }: Props) => {
    const getTotalItems = (items: TypeItemCart[]) =>
        items.reduce((ack: number, item) => ack + item.cartAmount, 0)
    return (
        <>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="relative bottom-2 px-1 bg-gray-300 text-black rounded-xl text-sm">
                {getTotalItems(cartItems)}
            </span>
        </>
    )
}

export default LinkItemCart
