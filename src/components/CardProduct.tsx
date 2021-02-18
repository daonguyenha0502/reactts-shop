import React from 'react';
import type { itemType } from 'src/App';
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';


import imgSale from '../../public/icon-saleoff.png';
import { Link } from 'react-router-dom';


interface Props {
    product: itemType
    onAdd: (product: itemType) => void
}

const CardProduct = ({ product, onAdd }: Props) => {
    forceCheck();
    return (
        <>
            <div className="relative w-56 sm:w-56 md:w-60 lg:w-56 xl:w-52 2xl:w-full h-96 bg-white rounded-md shadow-lg border border-gray-500 ">
                {/* <div onClick={handleOpenModal} className="h-auto"> */}
                <Link to={`products/${product._id}`}>
                    <div className="w-full flex justify-between absolute left-1 top-2 z-10">
                        <div className="flex-col text-sm font-bold">
                            <div>
                                <span className="line-through">
                                    {product.price.toLocaleString('en-US')}
                                </span>
                                <span> đ</span>
                            </div>
                            <div className="text-red-500">
                                {(product.price - Math.ceil(product.price / 10000 * product.sale / 100) * 10000).toLocaleString('en-US')}
                                <span> đ</span>
                            </div>
                        </div>
                        {product.sale !== 0 ? (<div
                            className="bg-no-repeat w-12 h-12 text-center pt-2 pr-2"
                            style={{ backgroundImage: `url(${imgSale})` }}
                        >
                            -{product.sale}%
                        </div>) : (<div
                            className="bg-no-repeat hidden w-12 h-12 text-center pt-2 pr-2"
                            style={{ backgroundImage: `url(${imgSale})` }}
                        >
                            -{product.sale}%
                        </div>)}

                    </div>
                    <LazyLoad><img
                        className="h-60 w-11/12 mx-auto pt-2 pb-2 hover:opacity-80 duration-700 "
                        src={product.img}
                        alt=""
                    /></LazyLoad>

                    <hr className="border-t-4 border-gray-600 pb-2" />

                    <div className="h-16">
                        <p className="h-16 overflow-ellipsis overflow-y-hidden text-lg font-semibold">{product.name}</p>
                    </div>
                </Link>

                <button
                    className="bg-blue-600 active:bg-blue-400 focus:outline-none hover:bg-blue-800  px-4 py-2 z-20 rounded-md mt-2 font-semibold text-white"
                    onClick={() =>
                        onAdd(product)
                    }
                >
                    Add to cart
        </button>
            </div>
        </>
    );
};

export default CardProduct;
