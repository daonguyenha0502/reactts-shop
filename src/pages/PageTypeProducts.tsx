import React, { useState, useEffect, ChangeEvent } from 'react'
import { Helmet } from 'react-helmet-async'
import ListProducts from '../components/ListProducts'
import { ScrollToTop, itemType } from '../App'
import productApi from '../api/productApi'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form';

interface Props {

}

const PageTypeProducts = (props: Props) => {
    ScrollToTop()
    const [listProduct, setListProduct] = useState<itemType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [valueOfRange, setValueOfRange] = useState<number | 0>(0);

    let location = useLocation()
    useEffect(() => {
        setIsLoading(true)
        let { search } = location
        let query = search.slice(6, search.length)
        //console.log(query)
        if (query) {
            const searchProduct = async () => {
                try {
                    const response: any = await productApi.searchByType(query);
                    //console.log(response)
                    setListProduct(response);
                    await setIsLoading(false);
                } catch (error) {
                    console.log('Failed to fetch product list: ', error);
                }
            };
            searchProduct()
        } else {
            setListProduct([]);
            setIsLoading(false);
        }
    }, [location.search]);

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data: any) => console.log(data);
    console.log(errors);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValueOfRange(parseInt(e.target.value))
    }
    return (
        <div className="mt-16 py-4">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{location.search.slice(6, location.search.length).toUpperCase()}</title>
                <link rel="canonical" href="cpt-ha.web.app" />
            </Helmet>
            <h1 className="text-3xl mb-4">All products of <span className="text-red-600">{location.search.slice(6, location.search.length)}</span></h1>
            <div className="p-2 w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 2xl:w-3/4 mx-auto h-14 bg-gray-500 sticky top-12 z-30 flex rounded-md">
                <form className="flex justify-center items-center w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex w-1/3">
                        <p>{5000000} </p>
                        <input className=" mx-2 w-40 h-auto" type="range" placeholder="price" onChange={handleChange} defaultValue={0} name="price" ref={register} />
                        <p>  5000000</p>
                    </div>
                    <div className="flex justify-evenly w-full">
                        <div>
                            <label htmlFor="Fulen">Fulen </label>
                            <input name="company" id="Fulen" type="radio" value="Fulen" ref={register} />
                        </div>
                        <div>
                            <label htmlFor="STT">STT </label>
                            <input name="company" id="STT" type="radio" value="STT" ref={register} />

                        </div>
                        <input type="submit" />
                    </div>


                </form>
            </div>
            {isLoading ? (<ListProducts listProduct={listProduct} isLoading={isLoading} />) : (<>
                {listProduct.length === 0 ? (<h1 className="text-3xl mt-40">Not found product <span className="text-red-600">{location.search.slice(6, location.search.length)}</span></h1>) : (<ListProducts listProduct={listProduct} isLoading={isLoading} />)}
            </>
            )}
        </div>
    )
}

export default PageTypeProducts







