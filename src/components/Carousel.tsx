import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CustomSlider {
    settings: object
    listPictures: string[]
}

export default function CustomSlider({ settings, listPictures }: CustomSlider) {

    return (
        <div className="w-4/5 mx-auto mt-12 z-40">
            <Slider {...settings} prevArrow={<PrevArrow />} nextArrow={<NextArrow />} >
                {listPictures.map((picture) => {
                    return (<div key={picture}>
                        <img
                            src={picture}
                            alt=""
                        />
                    </div>)
                })}

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
