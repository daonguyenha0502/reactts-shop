import React from 'react'
import type { itemType } from '../../App'
import LazyLoad from 'react-lazyload'

import imgSale from '../../../public/icon-saleoff.png'
import { Link } from 'react-router-dom'
import { useTypeSafeTranslation } from '../../utility/useTypeSafeTranslation'

interface Props {
    product: itemType
    onAdd: (product: itemType) => void
}

const CardProduct = ({ product, onAdd }: Props) => {
    const { t } = useTypeSafeTranslation()
    return (
        <>
            <div className="relative py-2 w-56 sm:w-56 md:w-60 lg:w-56 xl:w-52 2xl:w-60 max-w-60 h-96 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-500 dark:border-gray-200">
                <Link to={`products/${product._id}`}>
                    <div className="w-11/12 flex justify-between absolute left-3 top-2 z-10">
                        {product.sale !== 0 ? (
                            <div className="flex-col text-sm font-bold">
                                <div>
                                    <span className="line-through">
                                        {product.price.toLocaleString('en-US')}
                                    </span>
                                    <span> đ</span>
                                </div>
                                <div className="text-red-700">
                                    {(
                                        product.price -
                                        Math.ceil(
                                            ((product.price / 10000) *
                                                product.sale) /
                                                100,
                                        ) *
                                            10000
                                    ).toLocaleString('en-US')}
                                    <span> đ</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-col dark:text-black text-sm font-bold">
                                <div>
                                    <span>
                                        {product.price.toLocaleString('en-US')}
                                    </span>
                                    <span> đ</span>
                                </div>
                            </div>
                        )}

                        {product.sale !== 0 ? (
                            <div
                                className="bg-contain bg-no-repeat w-12 h-12 text-center pt-2 pr-2"
                                style={{ backgroundImage: `url(${imgSale})` }}
                            >
                                -{product.sale}%
                            </div>
                        ) : (
                            <div
                                className="bg-no-repeat hidden w-12 h-12 text-center pt-2 pr-2"
                                style={{ backgroundImage: `url(${imgSale})` }}
                            >
                                -{product.sale}%
                            </div>
                        )}
                    </div>
                    <LazyLoad>
                        <img
                            className="h-60 dark:filter-brightness-80 rounded-lg w-11/12 mx-auto mb-2 hover:opacity-80 duration-700"
                            src={product.img}
                            alt={product.name}
                        />
                    </LazyLoad>

                    <hr className="border-t-4 border-gray-600 dark:border-gray-100 pb-2" />

                    <div className="h-16">
                        <p className="h-16 dark:text-gray-200 text-black overflow-ellipsis overflow-y-hidden text-lg font-semibold">
                            {product.name}
                        </p>
                    </div>
                </Link>

                <button
                    className="bg-blue-600 active:bg-blue-400 focus:outline-none hover:bg-blue-800 px-4 py-2 z-20 rounded-md font-semibold text-gray-200"
                    onClick={() => onAdd(product)}
                >
                    {t('common.addToCart')}
                </button>
            </div>
        </>
    )
}

export default React.memo(CardProduct)
