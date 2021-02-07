import React from 'react';
import type { itemType } from 'src/App';
import imgSale from '../../public/icon-saleoff.png';
import Modal from './Modal';

interface Props {
    product: itemType
    onAdd: (clickedItem: itemType) => void;
}

const CardProduct = ({ product, onAdd }: Props) => {
    const [showModal, setShowModal] = React.useState(false);
    function handleOpenModal() {
        setShowModal(true);
        document.body.style.overflow = 'hidden'
    }
    return (
        <>
            {/* <Modal name={name} img={img} isOpenModal={isOpen} /> */}
            <Modal onShowModal={showModal} onSetShowModal={setShowModal} item={product} />
            <div className="relative w-56 sm:w-56 md:w-60 lg:w-56 xl:w-52 2xl:w-full h-96 bg-white rounded-md shadow-lg border border-gray-500 ">
                <div onClick={handleOpenModal} className="h-auto">
                    <div className="w-full flex justify-between absolute left-1 top-2 z-10">
                        <div className="flex-col text-sm font-bold">
                            <div>
                                <span className="line-through">
                                    {product.price.toLocaleString('en-US')}
                                </span>
                                <span> đ</span>
                            </div>
                            <div className="text-red-500">
                                {product.price.toLocaleString('en-US')}
                                <span> đ</span>
                            </div>
                        </div>
                        <div
                            className="bg-no-repeat w-12 h-12 text-center pt-2 pr-2"
                            style={{ backgroundImage: `url(${imgSale})` }}
                        >
                            -12%
            </div>
                    </div>
                    <img
                        className="h-64 w-11/12 mx-auto pt-1 pb-2 hover:opacity-80 duration-700 "
                        src={product.image}
                        alt=""
                    />
                    <hr className="border-t-4 border-gray-600 pb-2" />

                    <div className="h-14">
                        <p className="h-14 overflow-ellipsis overflow-y-hidden text-lg font-semibold">{product.title}</p>
                    </div>
                </div>
                <button
                    className="bg-blue-600 active:bg-blue-400 focus:outline-none hover:bg-blue-800  px-4 py-2 z-20 rounded-md mt-2 font-semibold text-white"
                    onClick={() =>
                        onAdd({ id: product.id, title: product.title, image: product.image, price: product.price, amount: 0 })
                    }
                >
                    Add to cart
        </button>
            </div>
        </>
    );
};

export default CardProduct;
