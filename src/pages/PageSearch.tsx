import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import ListProducts from '../components/ListProducts'
import { ScrollToTop, itemType } from '../App'
import productApi from '../api/productApi'
import { useLocation } from 'react-router-dom'

interface Props {

}

const PageSearch = (props: Props) => {
    ScrollToTop()
    const [listProduct, setListProduct] = useState<itemType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let location = useLocation()
    useEffect(() => {
        let { search } = location
        let query = search.slice(3, search.length)
        console.log(query)
        const searchProduct = async () => {
            try {
                const response: any = await productApi.searchProduct(query);
                console.log(response)
                setListProduct(response);
                await setIsLoading(true);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        };
        searchProduct()

    }, [location.search]);
    if (listProduct.length !== 0) {
        return (
            <div className="mt-16">
                <h1 className="text-3xl">Result for <span className="text-red-600">{location.search.slice(3, location.search.length)}</span></h1>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Search</title>
                    <link rel="canonical" href="cpt-ha.web.app" />
                </Helmet>
                <ListProducts listProduct={listProduct} isLoading={isLoading} />
            </div>
        )
    } else {
        return (
            <div className="mt-40">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Search</title>
                    <link rel="canonical" href="cpt-ha.web.app" />
                </Helmet>
                <h1 className="text-3xl">Not found product <span className="text-red-600">{location.search.slice(3, location.search.length)}</span></h1>
            </div>
        )
    }

}

export default PageSearch
