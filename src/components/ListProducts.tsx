import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { addToCart } from '../stores/cartsSlice'

import type { itemType } from '../App'
import CardProduct from './CardProduct'
import Skeleton from './Skeleton'

interface Props {
    listProduct: itemType[]
    isLoading: boolean
}

const ListProducts = ({ listProduct, isLoading }: Props) => {
    //console.log('lisproduct')
    const dispatch = useDispatch()
    const handleAddToCart = (product: itemType) => {
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

    return (
        <div className="w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 2xl:w-3/4 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-9 justify-items-center mt-5 mx-auto">
            {!isLoading ? (
                listProduct
                    .filter(
                        (v, i, a) =>
                            a.findIndex(
                                (t) => t._id === v._id && t.name === v.name,
                            ) === i,
                    )
                    .map((product) => (
                        <CardProduct
                            key={product._id}
                            onAdd={handleAddToCart}
                            product={product}
                        />
                    ))
            ) : (
                <>
                    <Skeleton key={1} />
                    <Skeleton key={2} />
                    <Skeleton key={3} />
                    <Skeleton key={4} />
                    <Skeleton key={5} />
                    <Skeleton key={6} />
                    <Skeleton key={7} />
                    <Skeleton key={8} />
                    <Skeleton key={9} />
                    <Skeleton key={10} />
                    <Skeleton key={11} />
                    <Skeleton key={12} />
                </>
            )}
        </div>
    )
}

export default ListProducts
