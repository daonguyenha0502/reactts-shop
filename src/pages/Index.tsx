import React from 'react';
import Footer from '../components/Footer';
import { itemType, ScrollToTop } from '../App';
import CustomSlider from '../components/Carousel';
import Catagory from '../components/Catagory';
import ListProducts from '../components/ListProducts';

interface Props {
    onAdd: (item: itemType) => void
    listProduct: itemType[]
    isLoading: boolean
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

const Index = ({ onAdd, listProduct, isLoading, listPictures }: Props) => {
    ScrollToTop()
    return (
        <div >
            <CustomSlider settings={settings} listPictures={listPictures} />
            <Catagory />
            <ListProducts onAdd={onAdd} listProduct={listProduct} isLoading={isLoading} />
            <Footer />
        </div>
    );
};

export default Index;
