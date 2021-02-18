import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {  toast } from 'react-toastify';
import {Helmet} from 'react-helmet-async'

import type { itemType } from '../App';
import productApi from '../api/productApi';

import CustomSlider from '../components/Carousel';
import { addToCart } from '../app/cartsSlice';




interface Props {
}

interface Product{
    guarantee: string
    idProduct: itemType
    img: string
    info: string
}


export default function ProductDetail() {
    const [productDetail, setProductDetail] = useState<Product | null>(null)
    const [pictures, setPictures] = useState<string[]|[]>([])

        const dispatch = useDispatch();
    const handleAddToCart = (product: itemType) => {
        console.log('addtoCart: ', product);
        const action = addToCart(product);
        dispatch(action);
        toast.info(`🦄 ${product.name} added to cart`, {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    let { id }:any = useParams()
    useEffect(() => {
        const getProductDetail = async (id: string) => {
            const product: any = await productApi.get(id)
            console.log(product)
            setProductDetail(product);
            setPictures(await product.img.split(','))
            //await setIsLoading(true);
        };
        getProductDetail(id);
    }, [id])
    

    const settings = {
        appendDots: (customDots: any) => (

            <ul className="space-x-2" style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                position: "absolute",
                bottom: "-60px",
                width: "100%",
                padding: 0,
                marginLeft: 0,
                listStyle: "none",
                textAlign: "center"
            }}> {customDots} </ul>

        ),
        customPaging: function (i: number) {
            return (
                <a >
                    <img className="rounded-md border py-0.5 border-gray-900 w-14 h-16" src={pictures[i]} />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-thumb",
        infinite: true,
        //variableWidth: true,
        //slidesToShow: 1,
        //slidesToScroll: 1,
    }
    if (productDetail ) {
        return (
            <>
            <Helmet>
                <meta charSet="utf-8" />
        <title>{productDetail.idProduct.name}</title>
                <link rel="canonical" href="cpt-ha.web.app" />
            </Helmet>
            
                <div className="h-auto my-6 mx-auto max-w-5xl" >
                    {/*content*/}
                    <div className=" border-0 mt-12 rounded-lg shadow-lg  flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex h-20 w-full items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                            <p className="text-xl font-semibold">Name: {productDetail.idProduct.name}</p>

                        </div>
                        {/*body*/}
                        <div className="px-12 py-6 flex">
                            <div className="w-80 h-auto -mt-12">
                                <CustomSlider settings={settings} listPictures={pictures} />
                            </div >
                            <div className="w-full h-auto text-left mb-4 pl-4">
                                <p className="my-4  text-lg leading-relaxed">
                                Company: <span className="text-gray-600">{productDetail.idProduct.company}</span></p>
                                
                                <p className="my-4 text-lg leading-relaxed">
                                Price: <span className="text-gray-600 line-through">{(productDetail.idProduct.price).toLocaleString("en-US")}đ</span> -  
                                {' '}<span className="text-red-500">{(productDetail.idProduct.price - Math.ceil((productDetail.idProduct.price/10000 * productDetail.idProduct.sale /100))*10000).toLocaleString('en-US')}đ</span></p>
                                <p className="my-4 text-red-500 text-lg leading-relaxed">
                                Sale: <span className="text-gray-600 ">{productDetail.idProduct.sale}%</span></p>
                                <p className="my-4 text-lg leading-relaxed">Amount: <span className="text-gray-600">{productDetail.idProduct.amount - productDetail.idProduct.sold}</span></p>
        <p>Information: <span className="text-gray-600">{productDetail.info}</span></p>
                                <div>
                                    <button
                                        className="bg-blue-600 active:bg-blue-400 focus:outline-none hover:bg-blue-800  px-4 py-2 z-20 rounded-md mt-2 font-semibold text-white"
                                        onClick={() =>
                                            handleAddToCart(productDetail.idProduct)
                                        }
                                    >
                                        Add to cart
        </button>
                                </div>
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



            </>
        );
    } else {
        return (
            <div>
                asdasfasds
                 asdasfasds
                  asdasfasds
                   asdasfasds

                    asdasfasds
                     asdasfasds
                      asdasfasds
                       asdasfasds

                        asdasfasds
                         asdasfasds
                          asdasfasds
                           asdasfasds
                            asdasfasds
                            
               
            </div>
        )
    }

}
