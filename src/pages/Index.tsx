import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import productApi from '../api/productApi';

import Footer from '../components/Footer';
import { itemType, ScrollToTop } from '../App';
import CustomSlider from '../components/Carousel';
import Category from '../components/Category';
import ListProducts from '../components/ListProducts';



interface Props {
    listPictures: string[]
}
let settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    fade: true,
    autoplaySpeed: 5000,
    autoplay: true,
};

const Index = ({ listPictures }: Props) => {
    ScrollToTop()
    const [listProduct, setListProduct] = useState<itemType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const getAllProduct = async () => {
            if (sessionStorage.getItem('listProducts')) {
                setListProduct(JSON.parse(sessionStorage.getItem('listProducts') as string))
                await setIsLoading(true);
            } else {
                try {
                    const response: any = await productApi.getAll();
                    //console.log(response)
                    setListProduct(response);
                    await setIsLoading(true);
                    await sessionStorage.setItem('listProducts', JSON.stringify(response)) as any
                } catch (error) {
                    console.log('Failed to fetch product list: ', error);
                }

            }

        };
        getAllProduct()

    }, []);
    return (
        <div >
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
                <link rel="canonical" href="cpt-ha.web.app" />
            </Helmet>
            <CustomSlider
                settings={settings}
                listPictures={listPictures}
            />
            <Category />
            <ListProducts
                listProduct={listProduct}
                isLoading={isLoading}
            />
            <Footer />
        </div>
    );
};

export default Index;
