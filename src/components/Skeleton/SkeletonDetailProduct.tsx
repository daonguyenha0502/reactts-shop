import React from 'react'
import { Helmet } from 'react-helmet-async'

interface Props { }

const SkeletonDetailProduct = (props: Props) => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Product</title>
                <link rel="canonical" href="cpt-ha.web.app" />
            </Helmet>

            <div className="h-auto my-6 mx-auto max-w-5xl">
                {/*content*/}
                <div className=" border-0 mt-12 rounded-lg shadow-lg  flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex h-20 w-full items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                        <div className="animate-pulse text-xl bg-gray-600 mt-2 w-80 h-8 font-semibold"></div>
                    </div>
                    {/*body*/}

                    <div className="px-12 py-6 sm:flex-row md:py-12 md:flex">
                        <div className="h-72 mx-auto w-60 md:h-auto bg-gray-600 mt-4"></div>
                        <div className="w-full h-auto text-left mb-4 md:pl-4 ">
                            <div className="my-4 animate-pulse  text-lg leading-relaxed bg-gray-600">
                                <span className="text-gray-600">1</span>
                            </div>

                            <div className="my-4 animate-pulse  text-lg leading-relaxed bg-gray-600">
                                <span className="text-gray-600 line-through">
                                    1
                                </span>
                            </div>
                            <div className="my-4 animate-pulse  text-lg leading-relaxed bg-gray-600">
                                <span className="text-gray-600 line-through">
                                    1
                                </span>
                            </div>
                            <div className="my-4 animate-pulse  text-lg leading-relaxed bg-gray-600">
                                <span className="text-gray-600 line-through">
                                    1
                                </span>
                            </div>
                            <div>
                                <button className="bg-blue-600 px-16 py-5 animate-pulse focus:outline-none rounded-md mt-2"></button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*footer*/}
                <div className="items-center  text-gray-600  justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <div className="my-4 animate-pulse w-full mb-4 text-lg leading-relaxed bg-gray-600">
                        <span className="text-gray-600 line-through">1</span>
                    </div>
                    <div className="my-4 animate-pulse w-full mb-4 text-lg leading-relaxed bg-gray-600">
                        <span className="text-gray-600 line-through">1</span>
                    </div>
                    <div className="my-4 animate-pulse w-full mb-4 text-lg leading-relaxed bg-gray-600">
                        <span className="text-gray-600 line-through">1</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SkeletonDetailProduct
