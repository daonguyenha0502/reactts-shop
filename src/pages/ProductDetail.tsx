import React, { useState, useEffect, ChangeEvent, MouseEventHandler } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { itemType, ScrollToTop } from '../App'
import productApi from '../api/productApi'

import CustomSlider from '../components/Carousel'
import { addToCart } from '../stores/cartsSlice'
import './CustomImage.css'
import SkeletonDetailProduct from '../components/SkeletonDetailProduct'
import type { TypeResponse } from '../api/axiosClient'
import userApi from '../api/userApi'
import { useSelector } from 'react-redux'
import type { RootState } from 'src/stores/store'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

interface Props { }

interface Product {
    guarantee: string
    idProduct: itemType
    img: string
    info: string
}
interface Comment {
    name: string
    content: string
    _id: string
}

export default function ProductDetail() {
    ScrollToTop()
    const [productDetail, setProductDetail] = useState<Product | null>(null)

    const [listComments, setListComments] = useState<Comment[] | []>([])
    const [page, setPage] = useState<number | 1>(1)
    const [isLoad, setIsLoad] = useState<boolean | true>(true)
    const [content, setContent] = useState<string | ''>('')
    const [isLoadingComments, setIsLoadingComments] = useState<boolean | true>(true)

    const [pictures, setPictures] = useState<string[] | []>([])
    const [isLoading, setIsLoading] = useState<boolean | true>(true)

    const user = useSelector((state: RootState) => state.users)

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

    let { id }: any = useParams()
    useEffect(() => {
        const getProductDetail = async (id: string) => {
            const response: TypeResponse = await productApi.get(id)
            //console.log(product)
            if (!response.data.error) {
                setProductDetail(response.data)
                setPictures(await response.data.img.split(','))
            } else {
                setProductDetail(null)
                setPictures([])
            }
            await setIsLoading(false)
        }
        getProductDetail(id)
    }, [id])

    useEffect(() => {
        const getListComments = async (id: string) => {
            const response: TypeResponse = await productApi.getComments(id, {
                _limit: 10,
                _page: page,
            })
            if (listComments.length === 0) {
                setListComments(response.data)
                setIsLoadingComments(false)
            } else {
                setListComments([...listComments, ...response.data])
                setIsLoadingComments(false)
            }
            if (response.data.length >= 0 && response.data.length < 8) {
                setIsLoad(false)
            }
        }
        getListComments(id)
    }, [id, page])

    function loadMoreComment() {
        if (isLoad) {
            setIsLoadingComments(true)
            setPage(page + 1)
        } else {
            return
        }

    }


    const settings = {
        appendDots: (customDots: any) => (
            <ul
                className="space-x-2"
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    position: 'absolute',
                    bottom: '-4rem',
                    width: '100%',
                    padding: 0,
                    marginLeft: 0,
                    listStyle: 'none',
                    textAlign: 'center',
                }}
            >
                {customDots}
            </ul>
        ),
        customPaging: function (i: number) {
            return (
                <a>
                    <img
                        className="rounded-md border py-0.5 border-gray-900 w-14 h-16"
                        src={pictures[i]}
                        alt={pictures[i]}
                    />
                </a>
            )
        },
        dots: true,
        dotsClass: 'slick-thumb',
        infinite: true,
        //variableWidth: true,
        //slidesToShow: 1,
        //slidesToScroll: 1,
    }
    async function saveCmt() {
        try {
            const response: any = await userApi.saveComment({ idProduct: id, content: content })
            if (response.data) {
                toast.info(`Saved!`, {
                    position: 'bottom-center',
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                let idRandom = Math.floor(Math.random() * Math.floor(100));
                setListComments([{ name: "You", content: content, _id: idRandom.toString() }, ...listComments])
                setContent('')

            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error.error.error)
        }
    }
    const handleSend = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if (user.accessToken && user.refreshToken) {
            if (content) {
                saveCmt()
            } else {
                console.log('text not empty')
            }
        } else {
            toast.warning(`You must login to comment!`, {
                position: 'bottom-center',
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }


    }
    if (productDetail) {
        return (
            <>
                <Helmet>
                    <title>{productDetail.idProduct.name}</title>
                    <link rel="canonical" href="https://cpt-ha.web.app" />
                </Helmet>

                <div className="h-auto py-6 mx-auto max-w-5xl">
                    {/*content*/}
                    <div className=" border-0 py-6 rounded-lg shadow-lg  flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex h-20 w-full items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                            <p className="text-xl font-semibold">
                                Name: {productDetail.idProduct.name}
                            </p>
                        </div>
                        {/*body*/}
                        <div className="px-12 py-6 sm:flex-row md:py-12 md:flex">
                            <div className="w-80 h-auto -mt-12 mx-auto">
                                <CustomSlider
                                    settings={settings}
                                    listPictures={pictures}
                                />
                            </div>
                            <div className="mt-20 md:mt-0 w-full h-auto text-left mb-4 pl-4">
                                <p className="my-4  text-lg leading-relaxed">
                                    Company:
                                    <span className="text-gray-600">
                                        {productDetail.idProduct.company}
                                    </span>
                                </p>

                                <p className="my-4 text-lg leading-relaxed">
                                    Price:
                                    <span className="text-gray-600 line-through">
                                        {productDetail.idProduct.price.toLocaleString(
                                            'en-US',
                                        )}
                                        đ
                                    </span>
                                    -
                                    <span className="text-red-500">
                                        {(
                                            productDetail.idProduct.price -
                                            Math.ceil(
                                                ((productDetail.idProduct
                                                    .price /
                                                    10000) *
                                                    productDetail.idProduct
                                                        .sale) /
                                                100,
                                            ) *
                                            10000
                                        ).toLocaleString('en-US')}
                                        đ
                                    </span>
                                </p>
                                <p className="my-4 text-red-500 text-lg leading-relaxed">
                                    Sale:
                                    <span className="text-gray-600 ">
                                        {productDetail.idProduct.sale}%
                                    </span>
                                </p>
                                <p className="my-4 text-lg leading-relaxed">
                                    Amount:
                                    <span className="text-gray-600">
                                        {productDetail.idProduct.amount -
                                            productDetail.idProduct.sold}
                                    </span>
                                </p>
                                <p>
                                    Information:
                                    <span className="text-gray-600">
                                        {productDetail.info}
                                    </span>
                                </p>
                                <div>
                                    <button
                                        className="bg-blue-600 active:bg-blue-400 focus:outline-none hover:bg-blue-800  px-4 py-2 z-20 rounded-md mt-2 font-semibold text-white"
                                        onClick={() =>
                                            handleAddToCart(
                                                productDetail.idProduct,
                                            )
                                        }
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                            I always felt like I could do anything. That’s the
                            main thing people are controlled by! Thoughts- their
                            perception of themselves! They're slowed down by
                            their perception of themselves. If you're taught you
                            can’t do anything, you won’t do anything. I was
                            taught I could do everything.
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                            <form className="w-full">
                                <textarea className="w-full px-2 py-1 bg-gray-300 rounded-md" onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} value={content} name="content" id="content" rows={5}></textarea>
                                <button onClick={handleSend} className="px-6 py-2 rounded-sm bg-blue-600">Send</button>
                            </form>
                        </div>

                        <ul>
                            {
                                (listComments as Comment[]).map((comment: Comment) => {
                                    return (<li key={comment._id}>
                                        <p>{comment.name}</p>
                                        <p>{comment.content}</p>

                                    </li>)
                                })
                            }
                        </ul>
                        <div>
                            {
                                isLoadingComments ? (<button className="px-6 py-2 rounded-sm bg-blue-600 focus:outline-none opacity-80" disabled ><FontAwesomeIcon icon={faSpinner} pulse /> LoadMore</button>) : (<button className="px-6 py-2 rounded-sm bg-red-600" onClick={loadMoreComment}>LoadMore</button>)
                            }
                        </div>

                    </div>
                </div>
            </>
        )
    } else {
        return !isLoading ? (
            <div className="mt-48">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Product</title>
                    <link rel="canonical" href="cpt-ha.web.app" />
                </Helmet>
                <h1 className="text-4xl text-red-600">
                    Something went wrong 🤣
                </h1>
            </div>
        ) : (
                <SkeletonDetailProduct />
            )
    }
}
