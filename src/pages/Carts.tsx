import React from 'react';
import { itemType, ScrollToTop } from '../App';
import Checkout from '../components/Checkout';
import Footer from '../components/Footer';
import ItemCart from '../components/ItemCart';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { addToCart, reducerCart, deleteFromCart } from '../app/cartsSlice';
//import { setStateToast } from '../app/toastSlice'
import { toast } from 'react-toastify';

interface Props {
}

const Cart = (props: Props) => {
    ScrollToTop()
    const carts = useSelector((state: RootState) => state.carts);
    const dispatch = useDispatch();
    const handleAddToCart = (product: itemType) => {
        console.log('addtoCart: ', product);
        const action = addToCart(product);
        dispatch(action);
        // const actionToast = setStateToast({ data: product, state: true, type: "S" })
        // dispatch(actionToast)
        toast.info(`🦄 ${product.name} added to cart`, {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const handleReducerFromCart = (product: itemType) => {
        console.log('reducer: ', product);
        const action = reducerCart(product);
        dispatch(action);
        // const actionToast = setStateToast({ data: product, state: true, type: "W" })
        // dispatch(actionToast)
        toast.warning(`🦄 ${product.name} reducer from cart`, {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const handleRemoveFromCart = (product: itemType) => {
        const action = deleteFromCart(product)
        dispatch(action);
        // const actionToast = setStateToast({ data: product, state: true, type: "W" })
        // dispatch(actionToast)
        toast.error(`🦄 ${product.name} removed from cart`, {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    return (
        <>
            <h1 className="text-2xl mt-16 font-bold text-center">Cart</h1>
            <div className="px-40 h-screen mt-4 mx-auto space-x-4 lg:flex">
                <div className="overflow-y-auto h-5/6  max-w-min pr-4">
                    {carts.length !== 0 ? (
                        carts.map((item) => <ItemCart key={item._id} item={item} onAdd={handleAddToCart} onReducer={handleReducerFromCart} onRemoveFromCart={handleRemoveFromCart} />)
                    ) : (
                            <div className="w-120 h-4/5 py-4 border-gray-800 border rounded-lg leading-10 mb-8">
                                <p className="font-bold text-xl text-red-700">No product</p>
                            </div>
                        )}
                </div>
                <div className="h-5/6 max-w-min pl-10">
                    <Checkout cartItems={carts} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;
