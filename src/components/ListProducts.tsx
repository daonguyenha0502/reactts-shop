import React from 'react';
import type { itemType } from '../App';
import CardProduct from './CardProduct';
import Skeleton from './Skeleton';

interface Props {
    onAdd: (clickedItem: itemType) => void;
    listProduct: itemType[];
    isLoading: boolean
}

const ListProducts = ({ onAdd, listProduct, isLoading }: Props) => {
    return (
        <div className="w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 2xl:w-3/4 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-9 justify-items-center mt-5 mx-auto">
            {isLoading ? (listProduct.map((product) => (
                <CardProduct key={product.id.toString()} product={product} onAdd={onAdd} />
            ))) : (<><Skeleton /> <Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /> </>)}
            {/* <CardProduct
        img="https://i.imgur.com/SLWcBPe.jpg"
        name="Tai nghe SteelSeries Arctis 3 White Edition"
        price={1200000}
        onAdd={onAdd}
      />
      <CardProduct
        img="https://i.imgur.com/SLWcBPe.jpg"
        name="Tai nghe SteelSeries Arctis 3 White Edition"
        price={1200000}
        onAdd={onAdd}
      />
      <CardProduct
        img="https://i.imgur.com/SLWcBPe.jpg"
        name="Tai nghe SteelSeries Arctis 3 White Edition"
        price={1200000}
        onAdd={onAdd}
      />
      <CardProduct
        img="https://i.imgur.com/SLWcBPe.jpg"
        name="Tai nghe SteelSeries Arctis 3 White Edition"
        price={1200000}
        onAdd={onAdd}
      />
      <CardProduct
        img="https://i.imgur.com/SLWcBPe.jpg"
        name="Tai nghe SteelSeries Arctis 3 White Edition"
        price={1200000}
        onAdd={onAdd}
      />
      <CardProduct
        img="https://i.imgur.com/SLWcBPe.jpg"
        name="Tai nghe SteelSeries Arctis 3 White Edition"
        price={1200000}
        onAdd={onAdd}
      />
      <CardProduct
        img="https://i.imgur.com/SLWcBPe.jpg"
        name="Tai nghe SteelSeries Arctis 3 White Edition"
        price={1200000}
        onAdd={onAdd}
      />
      <CardProduct
        img="https://i.imgur.com/SLWcBPe.jpg"
        name="Tai nghe SteelSeries Arctis 3 White Edition"
        price={1200000}
        onAdd={onAdd}
      />
      <CardProduct
        img="https://i.imgur.com/SLWcBPe.jpg"
        name="Tai nghe SteelSeries Arctis 3 White Edition"
        price={1200000}
        onAdd={onAdd}
      /> */}
        </div>
    );
};

export default ListProducts;
