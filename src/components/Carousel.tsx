import React from 'react'
import Slider from 'react-slick'

//import './Carousel.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import type { TypeSlide } from 'src/pages/Index'
import { Link } from 'react-router-dom'

interface CustomSlider {
    settings: object
    listPictures: TypeSlide[] | string[]
}

export default function CustomSlider({ settings, listPictures }: CustomSlider) {
    return (
        <div className="w-4/5 mx-auto mt-12 z-40">
            <Slider
                {...settings}
                prevArrow={<PrevArrow />}
                nextArrow={<NextArrow />}
            >
                {typeof listPictures[0] === 'object' ?
                    (listPictures as TypeSlide[]).map((picture: TypeSlide) => {
                        return (
                            <Link key={picture._id} to={`blog/${picture.urlBlog}`}>
                                <div >
                                    <img src={picture.urlImg} alt="title ..." />
                                </div>
                            </Link>
                        )
                    }) : (listPictures as string[]).map((picture: string) => {
                        return (
                            <div key={picture}>
                                <img src={picture} alt="" />
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}

function PrevArrow(props: any) {
    const { className, style, onClick } = props
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
    )
}

function NextArrow(props: any) {
    const { className, style, onClick } = props
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
    )
}
