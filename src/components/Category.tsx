import React from 'react';
import ItemCategory from './ItemCategory';

interface Props { }

const Category = (props: Props) => {
    return (
        <div className="w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 2xl:w-3/4  grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-2 justify-items-center mt-5 mx-auto">
            <ItemCategory title="Keyboard" img="https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588518643/shop/category/keyboard_eaflnw.jpg" />
            <ItemCategory title="Head Phone" img="https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588518646/shop/category/headphone_i8joys.jpg" />
            <ItemCategory title="Mouse" img="https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588518652/shop/category/mouse_xriyc3.jpg" />
            <ItemCategory title="Chair" img="https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588518657/shop/category/chair_pvu6uc.png" />
        </div>
    );
};

export default Category;
