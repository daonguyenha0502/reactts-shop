import React from 'react'

interface Props {}

const Skeleton = (props: Props) => {
    return (
        <div className="animate-pulse relative w-56 sm:w-56 md:w-60 lg:w-56 xl:w-52 2xl:w-full h-96 bg-white rounded-md shadow-lg border border-gray-500 ">
            <div className="h-64 w-full">
                <img className="h-60 w-11/12 mx-auto mt-1 bg-gray-600" />
            </div>
            <hr className="border-t-4 border-gray-600 pb-2" />

            <div className="w-full">
                <p className="text-lg w-full h-4 font-semibold bg-gray-600"></p>
                <p className="text-lg w-full h-4 font-semibold bg-gray-600 mt-1"></p>
            </div>

            <button className="bg-blue-600 active:bg-blue-400 focus:outline-none hover:bg-blue-800  px-12 py-5 z-20 rounded-md mt-2 font-semibold text-white"></button>
        </div>
    )
}

export default React.memo(Skeleton)
