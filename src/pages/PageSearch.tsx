import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import ListProducts from '../components/ListProducts'
import { ScrollToTop } from '../App'
import type { itemType } from '../App'
import productApi from '../api/productApi'
import { useLocation } from 'react-router-dom'

interface Props { }

const PageSearch = (props: Props) => {
    ScrollToTop()
    const [listProduct, setListProduct] = useState<itemType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    let location = useLocation()
    useEffect(() => {
        setIsLoading(true)
        let { search } = location
        let query = search.slice(3, search.length)
        //console.log(query)
        if (query) {
            const searchProduct = async () => {
                try {
                    const response: any = await productApi.searchProduct(query)
                    //console.log(response)
                    setListProduct(response)
                    await setIsLoading(false)
                } catch (error) {
                    console.log('Failed to fetch product list: ', error)
                }
            }
            searchProduct()
        } else {
            setListProduct([])
            setIsLoading(false)
        }
    }, [location.search])
    return (
        <div className="mt-16">
            <Helmet>
                <title>Search</title>
                <link rel="canonical" href="https://cpt-ha.web.app" />
            </Helmet>
            <h1 className="text-3xl">
                Result for{' '}
                <span className="text-red-600">
                    {location.search.slice(3, location.search.length)}
                </span>
            </h1>
            {isLoading ? (
                <ListProducts listProduct={listProduct} isLoading={isLoading} />
            ) : (
                    <>
                        {listProduct.length === 0 ? (
                            <h1 className="text-3xl mt-40">
                                Not found product{' '}
                                <span className="text-red-600">
                                    {location.search.slice(
                                        3,
                                        location.search.length,
                                    )}
                                </span>
                            </h1>
                        ) : (
                                <ListProducts
                                    listProduct={listProduct}
                                    isLoading={isLoading}
                                />
                            )}
                    </>
                )}
        </div>
    )
}

export default PageSearch
