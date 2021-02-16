import React from 'react';
import { itemType, ScrollToTop } from '../App';
import Checkout from '../components/Checkout';
import Footer from '../components/Footer';
import ItemCart from '../components/ItemCart';

interface Props {
    cartItems: itemType[];
    onAdd: (item: itemType) => void
    onReducer: (id: string) => void
    onRemoveFromCart: (id: string) => void
}

const Cart = ({ cartItems, onAdd, onReducer, onRemoveFromCart }: Props) => {
    ScrollToTop()
    console.log(cartItems)
    return (
        <>
            <h1 className="text-2xl mt-16 font-bold text-center">Cart</h1>
            <div className="px-40 h-screen mt-4 mx-auto space-x-4 lg:flex">
                <div className="overflow-y-auto h-5/6  max-w-min pr-4">
                    {cartItems.length !== 0 ? (
                        cartItems.map((item) => <ItemCart key={item._id} item={item} onAdd={onAdd} onReducer={onReducer} onRemoveFromCart={onRemoveFromCart} />)
                    ) : (
                            <div className="w-120 h-4/5 py-4 border-gray-800 border rounded-lg leading-10 mb-8">
                                <p className="font-bold text-xl text-red-700">No product</p>
                            </div>
                        )}
                </div>
                <div className="h-5/6 max-w-min pl-10">
                    <Checkout cartItems={cartItems} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;
