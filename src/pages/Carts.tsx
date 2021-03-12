import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'

import { ScrollToTop } from '../App'

import type { RootState } from '../stores/store'
import { addToCart, reducerCart, deleteFromCart } from '../stores/cartsSlice'

import type { TypeItemCart } from '../stores/cartsSlice'

import Checkout from '../components/Checkout'
import Footer from '../components/Footer'
import ItemCart from '../components/ItemCart'

interface Props { }

const Cart = (props: Props) => {
    ScrollToTop()
    const carts = useSelector((state: RootState) => state.carts)
    const dispatch = useDispatch()
    const handleAddToCart = (product: TypeItemCart) => {
        //console.log('addtoCart: ', product);
        const action = addToCart(product)
        dispatch(action)
        toast.info(`🦄 ${product.name} added to cart`, {
            position: 'bottom-center',
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
    const handleReducerFromCart = (product: TypeItemCart) => {
        //console.log('reducer: ', product);
        const action = reducerCart(product)
        dispatch(action)
        toast.warning(`🦄 ${product.name} reducer from cart`, {
            position: 'bottom-center',
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
    const handleRemoveFromCart = (product: TypeItemCart) => {
        const action = deleteFromCart(product)
        dispatch(action)
        toast.error(`🦄 ${product.name} removed from cart`, {
            position: 'bottom-center',
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>My cart</title>
                <link rel="canonical" href="cpt-ha.web.app" />
            </Helmet>

            <h1 className="text-2xl mt-16 font-bold text-center">My Cart</h1>
            <div className="py-4 h-120 min-h-full md:flex-row md:px-10 xl:px-4 xl:flex 2xl:px-20 2xl:mt-4 2xl:space-x-4 2xl:flex">
                <div className="mx-auto overflow-y-auto h-1/2 xl:h-5/6 max-w-min mb-4">
                    {carts.length !== 0 ? (
                        carts.map((item) => (
                            <ItemCart
                                key={item._id}
                                item={item}
                                onAdd={handleAddToCart}
                                onReducer={handleReducerFromCart}
                                onRemoveFromCart={handleRemoveFromCart}
                            />
                        ))
                    ) : (
                            <div className="w-92 sm:w-120 h-4/5 py-4 border-gray-800 border rounded-lg leading-10 mb-8">
                                <p className="font-bold text-xl text-red-700">
                                    No product
                            </p>
                            </div>
                        )}
                </div>
                <div className="mx-auto h-1/2 xl:h-5/6 max-w-min">
                    <Checkout cartItems={carts} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Cart
