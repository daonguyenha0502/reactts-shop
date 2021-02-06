import React, { useState } from 'react';
import type { itemType } from 'src/App';

interface Props {
    item: itemType
    onAdd: (item: itemType) => void
    onReducer: (id: string) => void
}

const ItemCart = ({ item, onAdd, onReducer }: Props) => {
    const [amount, setAmount] = useState<number | 1>(1);
    return (
        <div className="w-120 h-auto border-gray-800 border rounded-lg leading-10 mb-8">
            <div className="flex">
                <img
                    className="border-gray-800 border-r rounded-l-md"
                    width="150px"
                    height="auto"
                    src={item.image}
                    alt=""
                />
                <div className="flex-row text-center w-full py-2">
                    <p className="text-center font-bold">
                        {item.title}
                    </p>
                    <p>Price: {(item.amount * item.price).toLocaleString()} $</p>
                    <div className="flex w-full justify-center leading-4">
                        {item.amount <= 0 ? (
                            <button
                                className="px-7 cursor-not-allowed rounded-md py-1 focus:outline-none bg-blue-600  opacity-50 text-xl"
                                disabled={true}
                            >
                                -
                            </button>
                        ) : (
                                <button
                                    className="px-7 rounded-md py-1 focus:outline-none bg-blue-600 hover:bg-blue-500 text-xl "
                                    onClick={() => onReducer(item.id)}
                                >
                                    -
                                </button>
                            )}
                        <p className="px-5 py-1">{`< ${item.amount} >`}</p>
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
