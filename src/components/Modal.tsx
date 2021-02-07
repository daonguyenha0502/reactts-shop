import React, { useEffect, useRef } from 'react';
import type { itemType } from '../App';
import CustomSlider from './Carousel';

interface Props {
    onShowModal: boolean;
    onSetShowModal: any;
    item: itemType
}

let pictures: string[] = ["https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"]
// https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation



export default function Modal({ onShowModal, onSetShowModal, item }: Props) {
    function customDots({ children }: any) {
        return (<>
            <li>{children}</li>
        </>)
    }
    const settings = {
        appendDots: (customDots: any) => (
            <>
                <ul style={{
                    display: "block",
                    position: "absolute",
                    bottom: "-25px",
                    width: "100%",
                    padding: 0,
                    margin: 0,
                    listStyle: "none",
                    textAlign: "center"
                }}> {customDots} </ul>
            </>
        ),
        customPaging: function (i: number) {
            return (
                <a>
                    <img className="border border-gray-900 w-6 h-auto" src={pictures[i]} />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        //variableWidth: true,
        //slidesToShow: 1,
        // slidesToScroll: 1,
    }

    return (
        <>
            {onShowModal ? (
                <>
                    <div className="opacity-50 fixed inset-0 w-full h-full z-20 bg-black" ></div>
                    <div
                        className="justify-center items-center mt-4 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none"
                    //onClick={() => { onSetShowModal(false), document.body.style.overflow = 'unset' }}
                    >
                        <div className="relative w-auto h-auto my-6 mx-auto max-w-3xl" >
                            {/*content*/}
                            <div className=" border-0 mt-12 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
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
                                <div className="relative p-6 flex">
                                    <div className="w-52 h-auto">
                                        <CustomSlider settings={settings} listPictures={pictures} />
                                    </div >
                                    <div className="w-96 h-64">
                                        <p className="my-4 text-gray-600 text-lg leading-relaxed">
                                            I always felt like I could do anything. That’s the main
                                            thing people are controlled by! Thoughts- their perception
                                            of themselves! They're slowed down by their perception of
                                            themselves. If you're taught you can’t do anything, you
                                            won’t do anything. I was taught I could do everything.
                  </p>
                                    </div>


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
