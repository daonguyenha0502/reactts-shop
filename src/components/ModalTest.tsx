import React, { useEffect } from 'react';
import type { itemType } from '../App';
import CustomSlider from './Carousel';

interface Props {
    onShowModal: boolean;
    onSetShowModal: any;
    item: itemType
}

let pictures: string[] = ["https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588517602/shop/other/sl3_j9d1sa.png", "https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588517607/shop/other/sl2_w0zrzi.png", "https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588517613/shop/other/sl1_hotjpl.png"]
// https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation

export default function Modal({ onShowModal, onSetShowModal, item }: Props) {
    const settings = {
        customPaging: function (i: number) {
            return (
                <a>
                    <img src={`/abstract0${i + 1}.jpg`} />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true
    }
    return (
        <>
            {onShowModal ? (
                <>
                    <div className="opacity-50 fixed inset-0 w-full h-full z-20 bg-black" onClick={() => { onSetShowModal(false), document.body.style.overflow = 'unset' }}></div>
                    <div
                        className="justify-center items-center mt-12 pt-12 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none"

                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl" >
                            {/*content*/}
                            <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex h-20 w-full items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <p className="text-xl font-semibold">{item.title}</p>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => { onSetShowModal(false), document.body.style.overflow = 'unset' }}
                                    >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    {/* <CustomSlider settings={settings} listPictures={pictures} /> */}
                                    <img className="w-auto h-64" src={item.image} alt="" />
                                    <p className="my-4 text-gray-600 text-lg leading-relaxed">
                                        I always felt like I could do anything. That’s the main
                                        thing people are controlled by! Thoughts- their perception
                                        of themselves! They're slowed down by their perception of
                                        themselves. If you're taught you can’t do anything, you
                                        won’t do anything. I was taught I could do everything.
                  </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">I always felt like I could do anything. That’s the main
                                thing people are controlled by! Thoughts- their perception
                                of themselves! They're slowed down by their perception of
                                themselves. If you're taught you can’t do anything, you
                                        won’t do anything. I was taught I could do everything.</div>
                            </div>
                        </div>
                    </div>

                </>
            ) : null}
        </>
    );
}
