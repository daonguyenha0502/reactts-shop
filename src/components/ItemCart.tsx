import React, { useState } from 'react';
import type { itemType } from 'src/App';

interface Props {
    item: itemType
    onAdd: (item: itemType) => void
    onReducer: (product: itemType) => void
    onRemoveFromCart: (product: itemType) => void
}

const ItemCart = ({ item, onAdd, onReducer, onRemoveFromCart }: Props) => {
    return (
        <div className="w-120 h-auto border-gray-800 border rounded-lg leading-10 mb-8">
            <div className="flex">
                <img
                    className="border-gray-800 border-r py-2 rounded-l-md"
                    width="150px"
                    height="auto"
                    src={item.img}
                    alt=""
                />
                <div className="flex-row text-center w-full py-2">
                    <div className="flex mx-4">
                        <p className="text-center font-bold">
                            {item.name}
                        </p>
                        <button onClick={() => onRemoveFromCart(item)} className="ml-auto bg-transparent mb-3 border-0 outline-none focus:outline-none">
                            <span className="bg-transparent text-red-500 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                        </button>
                    </div>


                    <p>Price: {(item.cartAmount * item.price).toLocaleString()} Đồng</p>
                    <div className="flex w-full justify-center leading-4">
                        {item.cartAmount <= 0 ? (
                            <button
                                className="px-7 cursor-not-allowed rounded-md py-1 focus:outline-none bg-blue-600  opacity-50 text-xl"
                                disabled={true}
                            >
                                -
                            </button>
                        ) : (
                                <button
                                    className="px-7 rounded-md py-1 focus:outline-none bg-blue-600 hover:bg-blue-500 text-xl "
                                    onClick={() => onReducer(item)}
                                >
                                    -
                                </button>
                            )}
                        <p className="px-5 py-1">{`< ${item.cartAmount} >`}</p>
                        <button
                            className="px-7 rounded-md py-1 focus:outline-none bg-red-600 hover:bg-red-500 text-xl"
                            onClick={() => onAdd(item)}
                        >
                            +
            </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCart;
