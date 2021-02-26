import React from 'react'
import type { itemType } from 'src/App'
import type { TypeCheckout } from 'src/pages/CheckOut'
import clsx from 'clsx';

interface Props {
    carts: itemType[],
    stateCheckout: TypeCheckout
}

const ListProductOnCheckout = ({ carts, stateCheckout }: Props) => {
    return (
        <div className={clsx(stateCheckout !== "VIEW_CART" && "bg-gray-200 opacity-50 w-full pt-4 rounded-lg")}>
            <div className="mx-auto overflow-y-auto h-1/2 xl:h-5/6 max-w-min mb-4">
                {carts.map((item) =>
                    (<div key={item._id} className="w-80 sm:w-100  h-auto border-gray-800 border rounded-lg leading-5 mb-8">
                        <div className="flex h-18">
                            <img
                                className="border-gray-800 w-14 h-auto border-r py-2 rounded-l-md"
                                //width="150px"
                                //height="auto"
                                src={item.img}
                                alt=""
                            />
                            <div className="flex-row text-center w-full py-2 relative self-center">
                                <div className="flex mx-4 text-center text-sm sm:text-base font-bold space-x-4">
                                    <p >
                                        Amount: {item.cartAmount}
                                    </p>
                                    <p className="text-red-700">Discounted: {(item.cartAmount * (item.price - (Math.ceil(item.price / 10000 * item.sale / 100) * 10000))).toLocaleString()} Đồng</p>
                                </div>

                            </div>
                        </div>
                    </div>))

                }
            </div>
        </div>
    )
}

export default ListProductOnCheckout
