import React from 'react';
import Card from './Card';

interface Props {}

const Catagory = (props: Props) => {
  return (
    <div className="w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 2xl:w-3/4  grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-2 justify-items-center mt-5 mx-auto">
      <Card title= "Key Board" img = "https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588518643/shop/category/keyboard_eaflnw.jpg"/>
      <Card title= "Headphone" img = "https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588518646/shop/category/headphone_i8joys.jpg"/>
      <Card title= "Mouse" img = "https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588518652/shop/category/mouse_xriyc3.jpg"/>
      <Card title= "Chair" img = "https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588518657/shop/category/chair_pvu6uc.png"/>
    </div>
  );
};

export default Catagory;
