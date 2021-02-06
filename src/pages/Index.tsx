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
}

const Index = ({ onAdd, listProduct, isLoading }: Props) => {
    ScrollToTop()
    return (
        <div >
            <CustomSlider />
            <Catagory />
            <ListProducts onAdd={onAdd} listProduct={listProduct} isLoading={isLoading} />
            <Footer />
        </div>
    );
};

export default Index;
