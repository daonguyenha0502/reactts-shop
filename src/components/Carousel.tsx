import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function CustomSlider() {
    let settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        fade: true,
        autoplaySpeed: 5000,
        autoplay: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };
    return (
        <div className="w-4/5 mx-auto mt-12">
            <Slider {...settings}>
                <div style={{ width: 100 }}>
                    <img
                        src="https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588517607/shop/other/sl2_w0zrzi.png"
                        alt=""
                    />
                </div>
                <div style={{ width: 100 }}>
                    <img
                        src="https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588517607/shop/other/sl2_w0zrzi.png"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        src="https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588517613/shop/other/sl1_hotjpl.png"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        src="https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588517602/shop/other/sl3_j9d1sa.png"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        src="https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588517613/shop/other/sl1_hotjpl.png"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        src="https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588517602/shop/other/sl3_j9d1sa.png"
                        alt=""
                    />
                </div>
            </Slider>
        </div>
    );
}

function PrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'block',
                zIndex: '10',
                left: '50px',
            }}
            onClick={onClick}
        />
    );
}

function NextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                zIndex: '10',
                right: '50px',
            }}
            onClick={onClick}
        />
    );
}
