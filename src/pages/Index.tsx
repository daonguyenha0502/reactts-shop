import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import InfiniteScroll from 'react-infinite-scroll-component'

import productApi from '../api/productApi'

import Footer from '../components/Footer/Footer'
import { itemType, ScrollToTop } from '../App'
import CustomSlider from '../components/Carousel/Carousel'
import Category from '../components/Category/Category'
import ListProducts from '../components/Product/ListProducts'
import Skeleton from '../components/Skeleton/Skeleton'
import carouselApi from '../api/carouselApi'
import type { TypeResponse } from '../api/axiosClient'
import { useTypeSafeTranslation } from '../utility/useTypeSafeTranslation'



export interface Props {

}

export interface TypeSlide {
    urlBlog: string
    urlImg: string
    _id: string
    alt: string
}

let settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    fade: true,
    autoplaySpeed: 5000,
    autoplay: true,
    lazyLoad: 'ondemand',
}

const Temp = () => {
    return (
        <div className="w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 2xl:w-3/4 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-9 justify-items-center mt-5 mx-auto">
            <Skeleton key={1} />
            <Skeleton key={2} />
            <Skeleton key={3} />
            <Skeleton key={4} />
        </div>
    )
}


const Index = (props: Props) => {
    ScrollToTop()
    const [listProduct, setListProduct] = useState<itemType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLoadingCarousel, setIsLoadingCarousel] = useState<boolean>(true)

    const [hasMore, setHasMore] = useState<boolean>(true)
    const [page, setPage] = useState<number | 1>(1)
    const [listSlides, setListSlides] = useState<TypeSlide[] | []>([])

    const { t } = useTypeSafeTranslation()

    const getProduct = async () => {
        try {
            const response: TypeResponse = await productApi.getAll({
                limit: 8,
                page: page,
            })
            //console.log(response)
            if (listProduct.length === 0) {
                setListProduct(response.data)
                setPage(page + 1)
            } else {
                setListProduct([...listProduct, ...response.data])
                setPage(page + 1)
            }
            if (response.data.length >= 0 && response.data.length < 8) {
                setHasMore(false)
                await sessionStorage.setItem(
                    'listProducts',
                    JSON.stringify([...listProduct, ...response.data]),
                )
                return
            }
            await setIsLoading(false)
        } catch (error) {
            console.log('Failed to fetch product list: ', error)
        }
    }

    const getSlides = async () => {
        setIsLoadingCarousel(true)
        const response: TypeResponse = await carouselApi.getAll()
        //console.log(response.listSlide)
        if (response.data.length != 0) {
            setListSlides(response.data)
            setIsLoadingCarousel(false)
            sessionStorage.setItem('listSlides', JSON.stringify(response.data))
        } else {
            console.log('error')
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('listSlides')) {
            setIsLoadingCarousel(false)
            setListSlides(
                JSON.parse(sessionStorage.getItem('listSlides') as string),
            )
        } else {
            getSlides()
        }
    }, [])

    useEffect(() => {
        if (sessionStorage.getItem('listProducts')) {
            setHasMore(false)
            setListProduct(
                JSON.parse(sessionStorage.getItem('listProducts') as string),
            )
            setIsLoading(false)
        } else {
            getProduct()
        }
    }, [])
    //non scroll loading
    // useEffect(() => {
    //     const getAllProduct = async () => {
    //         if (sessionStorage.getItem('listProducts')) {
    //             setListProduct(JSON.parse(sessionStorage.getItem('listProducts') as string))
    //             await setIsLoading(false);
    //         } else {
    //             try {
    //                 const response: any = await productApi.getAll({});
    //                 //console.log(response)
    //                 setListProduct(response);
    //                 await setIsLoading(false);
    //                 await sessionStorage.setItem('listProducts', JSON.stringify(response)) as any
    //             } catch (error) {
    //                 console.log('Failed to fetch product list: ', error);
    //             }

    //         }

    //     };
    //     getAllProduct()

    // }, []);
    return (
        <div>
            <Helmet>
                <title>{t('common.title')}</title>
                <link rel="canonical" href="https://cpt-ha.web.app" />
            </Helmet>

            {isLoadingCarousel ? (<div className="w-4/5 animate-pulse  mx-auto mt-12 z-40">
                <div className="bg-gray-600 w-full h-36 xl:h-104 lg:h-80 md:h-40 sm:h-44"></div>
            </div>) :
                (<CustomSlider settings={settings} listPictures={listSlides} />)
            }

            <Category />
            <InfiniteScroll
                dataLength={listProduct.length}
                next={getProduct}
                hasMore={hasMore}
                loader={<Temp />}
                endMessage={
                    <p
                        style={{
                            textAlign: 'center',
                            color: 'red',
                            fontSize: '1.5rem',
                            marginTop: '0.5rem',
                        }}
                    >
                        <b>{t('common.outOfProduct')}</b>
                    </p>
                }
            >
                <ListProducts listProduct={listProduct} isLoading={isLoading} />
            </InfiniteScroll>

            <Footer />
        </div>
    )
}

export default Index
