import React from 'react';
import type { itemType } from '../App';

interface Props {
    cartItems: itemType[]
}

const getTotalItems = (items: itemType[]) =>
    items.reduce((ack: number, item) => ack + item.cartAmount, 0);

const getTotalPrice = (items: itemType[]) =>
    items.reduce((ack: number, item) => ack + item.cartAmount * (item.price - (Math.ceil(item.price / 10000 * item.sale / 100) * 10000)), 0);

const Checkout = ({ cartItems }: Props) => {

    return (
        <div className="bg-indigo-400 w-120 py-4 rounded-md leading-8">
            <div className="flex justify-between px-2">
                <p>Subtotal({getTotalItems(cartItems)} items)</p> <p>{getTotalPrice(cartItems)}</p>
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

            <button className="bg-blue-600 px-5 py-1 rounded-md hover:bg-red-400 active:bg-red-500 duration-500 focus:outline-none">Check out</button>
        </div>
    );
};

export default Checkout;
