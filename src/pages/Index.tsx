import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { itemType, ScrollToTop } from '../App';
import CustomSlider from '../components/Carousel';
import Catagory from '../components/Catagory';
import ListProducts from '../components/ListProducts';
import productApi from '../api/productApi';

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
            // const res: any = await fetch('https://gearshop.glitch.me/api/products');
            // const list = await res.json();
            // console.log(list)
            // setListProduct(list);
            // await setIsLoading(true);
            if (localStorage.getItem('listProducts') as any) {
                setListProduct(JSON.parse(localStorage.getItem('listProducts') as any))
                await setIsLoading(true);
            } else {
                try {
                    const response: any = await productApi.getAll();
                    //console.log(response)
                    setListProduct(response);
                    await setIsLoading(true);
                    await localStorage.setItem('listProducts', JSON.stringify(response)) as any
                } catch (error) {
                    console.log('Failed to fetch product list: ', error);
                }

            }

        };
        getAllProduct()

    }, []);
    return (
        <div >
            <CustomSlider
                settings={settings}
                listPictures={listPictures}
            />
            <Catagory />
            <ListProducts
                listProduct={listProduct}
                isLoading={isLoading}
            />
            <Footer />
        </div>
    );
};

export default Index;
