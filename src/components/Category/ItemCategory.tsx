import React from 'react'

interface Props {
    title: string
    img: string
}

const ItemCategory = ({ title, img }: Props) => {
    return (
        <div className="w-80 max-w-xs sm:w-full md:w-full h-48 bg-white-500 rounded-lg">
            <img className="h-40 w-full rounded-t-md" src={img} alt="" />
            <div className="h-8 border border-gray-800 dark:bg-gray-400 rounded-b-md">
                <p className="font-bold text-indigo-900 dark:text-indigo-600">{title}</p>
            </div>
        </div>
    )
}

export default ItemCategory
