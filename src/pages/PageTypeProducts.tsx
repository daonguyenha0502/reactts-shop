import React, { useState, useEffect, ChangeEvent } from 'react'
import { Helmet } from 'react-helmet-async'
import ListProducts from '../components/ListProducts'
import { ScrollToTop } from '../App'
import type { itemType } from '../App'
import productApi from '../api/productApi'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'

interface Props { }

const PageTypeProducts = (props: Props) => {
    ScrollToTop()
    const [listProduct, setListProduct] = useState<itemType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [maxRange, setMaxRange] = useState<number | 0>(0)
    const [minRange, setMinRange] = useState<number | 0>(0)
    const [valueOfRange, setValueOfRange] = useState<number | 0>(0)
    const [listCompany, setListCompany] = useState<string[] | []>([])
    const [list, setList] = useState<itemType[]>([])

    let location = useLocation()
    useEffect(() => {
        setIsLoading(true)
        let { search } = location
        let query = search.slice(6, search.length)
        //console.log(query)
        if (query) {
            const searchProduct = async () => {
                try {
                    const response: any = await productApi.searchByType(query)
                    //console.log(response)
                    setListProduct(response)
                    setList(response)
                    setMaxRange(
                        Math.max.apply(
                            Math,
                            response.map(function (i: itemType) {
                                return i.price
                            }),
                        ),
                    )
                    setMinRange(
                        Math.min.apply(
                            Math,
                            response.map(function (i: itemType) {
                                return i.price
                            }),
                        ),
                    )
                    let temp: string[] = []
                    for (let i = 0; i < response.length; i++) {
                        //console.log(response[i].company)
                        if (!temp.includes(response[i].company)) {
                            temp = [...temp, response[i].company]
                        }
                    }
                    setListCompany(temp)
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

    const { register, handleSubmit } = useForm()
    const filterByPrice = (data: any) => {
        const clone: itemType[] = [...list]
        //console.log(data.price);
        let temp: itemType[] = []
        for (let i = 0; i < clone.length; i++) {
            if (clone[i].price <= parseInt(data.price)) {
                temp.push(clone[i])
            }
        }
        setListProduct(temp)
    }
    const filterByCompany = (data: any) => {
        //console.log(data.company);
        if (data.company) {
            const clone: itemType[] = [...list]
            let temp: itemType[] = []
            for (let i = 0; i < clone.length; i++) {
                if (clone[i].company === data.company) {
                    temp.push(clone[i])
                }
            }
            setListProduct(temp)
        }
    }
    const handleReset = (e: ChangeEvent<any>) => {
        e.preventDefault()
        setListProduct(list)
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValueOfRange(parseInt(e.target.value))
    }
    return (
        <div className="mt-16 py-4">
            <Helmet>
                <title>
                    {location.search
                        .slice(6, location.search.length)
                        .toUpperCase()}
                </title>
                <link rel="canonical" href="https://cpt-ha.web.app" />
            </Helmet>
            <h1 className="text-3xl mb-4">
                All products of{' '}
                <span className="text-red-600">
                    {location.search.slice(6, location.search.length)}
                </span>
            </h1>

            {isLoading ? (
                <div className="xl:h-14 h-24 flex-col xl:flex-row xl:p-2 p-4 w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 2xl:w-3/4 mx-auto bg-gray-500 sticky top-12 z-30 flex rounded-md text-gray-500">
                    haha{' '}
                </div>
            ) : (
                    <div className="xl:h-14 h-24 flex-col xl:flex-row xl:p-2 p-4 w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 2xl:w-3/4 mx-auto bg-gray-500 sticky top-12 z-30 flex rounded-md">
                        <form className="hidden sm:flex xl:justify-start justify-center items-center w-full xl:w-1/2 mb-1">
                            <div className="flex relative">
                                {valueOfRange !== 0 ? (
                                    <p className="absolute -top-4 right-28">
                                        {valueOfRange}
                                    </p>
                                ) : (
                                        <p className="absolute -top-4 right-28">
                                            {minRange}
                                        </p>
                                    )}
                                <p className="w-20">{minRange}</p>
                                <input
                                    className=" mx-2 w-40 h-auto"
                                    type="range"
                                    placeholder="price"
                                    onChange={handleChange}
                                    defaultValue={minRange}
                                    step={100000}
                                    max={maxRange}
                                    min={minRange}
                                    name="price"
                                    ref={register}
                                />
                                <p>{maxRange}</p>
                            </div>

                            <button
                                className="w-14 h-8 rounded-sm bg-blue-400 ml-3"
                                onClick={handleSubmit(filterByPrice)}
                            >
                                Solve
                        </button>
                        </form>

                        <form className="flex justify-center items-center w-full xl:w-1/2">
                            <div className="flex justify-evenly w-full">
                                {(listCompany as []).map((name: string) => (
                                    <div key={name}>
                                        <label htmlFor={name}>{name} </label>
                                        <input
                                            name="company"
                                            id={name}
                                            type="radio"
                                            value={name}
                                            ref={register}
                                        />
                                    </div>
                                ))}

                                <button
                                    className="rounded-sm bg-red-400 w-14 h-8"
                                    onClick={handleSubmit(filterByCompany)}
                                >
                                    Filter
                            </button>
                                <button
                                    className="rounded-sm bg-green-400 w-14 h-8"
                                    onClick={handleReset}
                                >
                                    Reset
                            </button>
                            </div>
                        </form>
                    </div>
                )}

            {isLoading ? (
                <ListProducts listProduct={listProduct} isLoading={isLoading} />
            ) : (
                    <>
                        {listProduct.length === 0 ? (
                            <h1 className="text-3xl mt-40">
                                Not found product{' '}
                                <span className="text-red-600">
                                    {location.search.slice(
                                        6,
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

export default PageTypeProducts
