import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import { yupResolver } from '@hookform/resolvers/dist/yup'
import * as yup from 'yup'

import locationsApi from '../api/locationsApi'
import checkOutApi from '../api/checkOutApi'

import { InputField, Error } from '../components/InputField'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../stores/store'
import ListProductOnCheckout from '../components/Checkout/ListProductOnCheckout'
import axios from 'axios'
import { TypeItemCart, freeCart } from '../stores/cartsSlice'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import type { TypeResponse } from '../api/axiosClient'
import { useTypeSafeTranslation } from '../utility/useTypeSafeTranslation'
import Footer from '../components/Footer/Footer'
//zalo pay
import CryptoJS from 'crypto-js'
import moment from 'moment'


const configZalo = {
    app_id: '2553',
    key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
}
//

interface Props { }

interface BillAttr {
    address: string
    cart: string
    code: string
    name: string
    email: string
    phone: string
    type: 'COD' | 'ZaloPay' | ''
}

interface TypeOfFrom1 {
    email: string
    firstname: string
    lastname: string
    phonenumber: string
    street: string
}

const InformationSchema = yup.object().shape({
    email: yup.string().email().required().min(12).max(50),
    firstname: yup.string().required().min(2).max(50),
    lastname: yup.string().required().min(2).max(70),
    phonenumber: yup
        .string()
        .matches(/0{1}[0-9]{2,10}/i)
        .length(10),
    street: yup.string().required().min(5).max(120),
})

type LocationType = {
    value: string
    label: string
}
export type TypeCheckout =
    | 'VIEW_CART'
    | 'ADD_ADDRESS'
    | 'ADD_PAYMENT'
    | 'PAYMENT'

//custom style of react select
const customStyles: object = {
    input: (provided: any, state: any) => ({
        ...provided,
        margin: 0,
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
        width: '20rem',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
        borderRadius: '0.375rem',
    }),
    control: (provided: any, state: any) => ({
        ...provided,
        borderRadius: '0.375rem',
        borderColor: `rgb(17, 24, 39)`,
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
        padding: 0,
        margin: 0,
    }),
    valueContainer: (provided: any, state: any) => ({
        ...provided,
        padding: 0,
        margin: 0,
        marginLeft: '0.75rem',
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
    }),
    placeholder: (provided: any, state: any) => ({
        ...provided,
        padding: 0,
        margin: 0,
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
    })
}
const customDarkStyles: object = {
    input: (provided: any, state: any) => ({
        ...provided,
        margin: 0,
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
        width: '20rem',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
        borderRadius: '0.375rem',
    }),
    control: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: '#4B5563',
        borderRadius: '0.375rem',
        borderColor: '#FFFFFF',
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
        padding: 0,
        margin: 0,
    }),
    valueContainer: (provided: any, state: any) => ({
        ...provided,
        padding: 0,
        margin: 0,
        marginLeft: '0.75rem',
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
    }),
    placeholder: (provided: any, state: any) => ({
        ...provided,
        color: '#E5E7EB',
        padding: 0,
        margin: 0,
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
    }),
    singleValue: (provided: any) => {
        return {
            ...provided,
            color: '#E5E7EB',
        }
    }
}

const CheckOut = (props: Props) => {
    const ZaloPay = async (carts: TypeItemCart[]) => {
        const getTotalPrice = (carts: TypeItemCart[]) =>
            carts.reduce(
                (ack: number, item: TypeItemCart) =>
                    ack +
                    item.cartAmount *
                    (item.price -
                        Math.ceil(
                            ((item.price / 10000) * item.sale) / 100,
                        ) *
                        10000),
                0,
            )
        const embed_data = {}
        const items = carts
        const transID = Math.floor(Math.random() * 1000000)
        const order = {
            app_id: configZalo.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
            app_user: 'Haaaa',
            app_time: Date.now(),
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: getTotalPrice(carts),
            description: `Test Payment for the order by H #${transID}`,
            bank_code: 'zalopayapp',
            mac: '',
        }
        const data =
            (await configZalo.app_id) +
            '|' +
            order.app_trans_id +
            '|' +
            order.app_user +
            '|' +
            order.amount +
            '|' +
            order.app_time +
            '|' +
            order.embed_data +
            '|' +
            order.item
        order.mac = await CryptoJS.HmacSHA256(data, configZalo.key1).toString()
        //console.log(order)
        axios
            .post(configZalo.endpoint, null, { params: order })
            .then((res) => {
                //console.log(res.data);
                window.open(res.data.order_url)
            })
            .catch((err) => console.log(err))
    }

    const user = useSelector((state: RootState) => state.users)
    const [stateCheckout, setStateCheckout] = useState<
        TypeCheckout | 'VIEW_CART'
    >('VIEW_CART')
    const [errorsLocation, setErrorsLocation] = useState<boolean | false>(false)

    const [listCity, setListCity] = useState<LocationType[] | []>([])
    const [currentCity, setCurrentCity] = useState<LocationType | null>(null)
    const [listDistrict, setListDistrict] = useState<LocationType[] | []>([])
    const [currentDistrict, setCurrentDistrict] = useState<LocationType | null>(
        null,
    )
    const [listWard, setListWard] = useState<LocationType[] | []>([])
    const [currentWard, setCurrentWard] = useState<LocationType | null>(null)

    const [bill, setBill] = useState<BillAttr | ''>('')
    const [typePayment, setTypePayment] = useState<'ZaloPay' | 'COD'>('COD')
    const { t } = useTypeSafeTranslation()
    const dispatch = useDispatch()
    const theme = useSelector((state: RootState) => state.themes)
    const [customSelector, setCustomSelector] = useState<object>(customStyles)
    useEffect(() => {
        if (theme.theme === 'light') {
            setCustomSelector(customDarkStyles)
        } else {
            setCustomSelector(customStyles)
        }

    }, [theme.theme])

    const getCities = async () => {
        const res: TypeResponse = await locationsApi.getListCity()
        const newObj = await res.data.map((itemLocation: any) => {
            return { value: itemLocation.MaTP, label: itemLocation.TenTP }
        })
        //console.log(newObj)
        setListCity(newObj)
    }

    const getDistricts = async (idCity: any) => {
        const res: TypeResponse = await locationsApi.getListDistrict(idCity)
        //console.log(res)
        const newObj = await res.data.map((itemLocation: any) => {
            return { value: itemLocation.MaQH, label: itemLocation.TenQH }
        })
        //console.log(newObj)
        setListDistrict(newObj)
    }
    const getWards = async (idCity: any, idDistrict: any) => {
        const res: TypeResponse = await locationsApi.getListWard(idCity, idDistrict)
        //console.log(res)
        const newObj = await res.data.map((itemLocation: any) => {
            return { value: itemLocation.MaXP, label: itemLocation.TenXa }
        })
        //console.log(newObj)
        setListWard(newObj)
    }
    if (user.accessToken) {
        useEffect(() => {
            getCities()
        }, [])

        useEffect(() => {
            if (currentCity) {
                setCurrentDistrict(null)
                setCurrentWard(null)
                getDistricts(currentCity.value)
                setErrorsLocation(false)
            }
        }, [currentCity?.value])
        useEffect(() => {
            if (currentDistrict && currentCity) {
                setCurrentWard(null)
                getWards(currentCity.value, currentDistrict.value)
                setErrorsLocation(false)
            }
        }, [currentDistrict?.value])
    }

    const changeStateCheckout = (state: TypeCheckout) => {
        setStateCheckout(state)
    }

    const carts = useSelector((state: RootState) => state.carts)

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(InformationSchema),
    })
    const onSubmit = (data: TypeOfFrom1) => {
        if (currentCity && currentDistrict && currentWard) {
            setErrorsLocation(false)
            //console.log({ name: data.firstname + " " + data.lastname, email: data.email, phone: data.phonenumber, address: data.street + "," + currentWard.label + "," + currentDistrict.label + "," + currentCity.label, code: currentCity.value + '-' + currentDistrict.value + '-' + currentWard.value, type: '' });
            setBill({
                name: data.firstname + ' ' + data.lastname,
                email: data.email,
                phone: data.phonenumber,
                address:
                    data.street +
                    ',' +
                    currentWard.label +
                    ',' +
                    currentDistrict.label +
                    ',' +
                    currentCity.label,
                code:
                    currentCity.value +
                    '-' +
                    currentDistrict.value +
                    '-' +
                    currentWard.value,
                type: '',
                cart: '',
            })
            setStateCheckout('ADD_PAYMENT')
        } else {
            setErrorsLocation(true)
        }
    }
    if (errors) {
        //console.log(errors);
    }
    const {
        register: register2,
        errors: errors2,
        handleSubmit: handleSubmit2,
    } = useForm({
        mode: 'onBlur',
    })
    const history = useHistory()
    const onSubmit2 = async (data: any) => {
        //console.log(data);
        if (bill !== '') {
            let cart = await JSON.stringify(carts)
            if (data.Payment === 'ZaloPay') {
                setBill({ ...bill, type: 'ZaloPay', cart: cart })
                setStateCheckout('PAYMENT')
                setTypePayment('ZaloPay')
            } else {
                setBill({ ...bill, type: 'COD', cart: cart })
                setStateCheckout('PAYMENT')
                setTypePayment('COD')
                //console.log('COD')
                //history.push('/profile')
            }
        } else {
            console.log('lose')
        }
    }
    if (errors2) {
        //console.log(errors2)
    }

    async function handleClick() {
        if (typePayment === 'ZaloPay') {
            const response: TypeResponse = await checkOutApi.saveBill(bill)
            //console.log(response)
            if (response.data.message) {
                await dispatch(freeCart())
                ZaloPay(carts)
                history.push('/profile')
            }
        } else {
            const response: TypeResponse = await checkOutApi.saveBill(bill)
            //console.log(response)
            if (response.data.message) {
                await dispatch(freeCart())
                history.push('/profile')
            }
        }
    }

    return (
        <>
            <Helmet>
                <title>{t('checkout.title')}</title>
                <link rel="canonical" href="https://cpt-ha.web.app" />
            </Helmet>
            {user.accessToken ? (
                <div className="w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 2xl:w-3/4 text-left py-20 mx-auto">
                    {carts.length > 0 ? (
                        <h1 className="text-2xl text-red-600 dark:text-red-500 text-center mb-4">
                            {t('checkout.title')}
                        </h1>
                    ) : (
                            <h1 className="text-2xl text-gray-500 dark:text-red-500  text-center mb-4">
                                {t('checkout.cartEmpty')}
                            </h1>
                        )}

                    <ListProductOnCheckout
                        carts={carts}
                        stateCheckout={stateCheckout}
                    />
                    <div className="text-center mb-4">
                        <button
                            className={clsx(
                                stateCheckout === 'VIEW_CART' &&
                                    carts.length > 0
                                    ? 'text-white hover:text-black mx-auto py-2 rounded-md px-8 bg-blue-600 focus:outline-none active:bg-pink-500 hover:bg-yellow-400'
                                    : 'invisible',
                            )}
                            onClick={() => changeStateCheckout('ADD_ADDRESS')}
                        >
                            {t('checkout.continue')}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div
                            className={clsx(
                                stateCheckout === 'ADD_ADDRESS'
                                    ? 'w-min mx-auto justify-center lg:w-full pb-4'
                                    : 'w-min mx-auto lg:w-full pb-4 bg-gray-200 dark:bg-gray-700 opacity-50 cursor-not-allowed rounded-lg select-none',
                            )}
                        >
                            <div className="space-x-0 lg:space-x-4 flex-col w-min mx-auto justify-center lg:w-full lg:flex-row lg:flex pb-4">
                                <div>
                                    <InputField
                                        labelContent={t('checkout.firstName')}
                                        name="firstname"
                                        register={register}
                                        typeInput="text"
                                    />
                                    {errors.firstname?.type === 'required' && (
                                        <Error error="First name is required" />
                                    )}
                                    {errors.firstname?.type === 'min' && (
                                        <Error error="Min is 2" />
                                    )}
                                    {errors.firstname?.type === 'max' && (
                                        <Error error="Max is 50" />
                                    )}

                                    <InputField
                                        labelContent={t('checkout.lastName')}
                                        name="lastname"
                                        register={register}
                                        typeInput="text"
                                    />
                                    {errors.lastname?.type === 'required' && (
                                        <Error error="Last name is required" />
                                    )}
                                    {errors.lastname?.type === 'min' && (
                                        <Error error="Min is 2" />
                                    )}
                                    {errors.lastname?.type === 'max' && (
                                        <Error error="Max is 70" />
                                    )}

                                    <InputField
                                        labelContent="Email"
                                        name="email"
                                        register={register}
                                        typeInput="email"
                                    />
                                    {errors.email?.type === 'email' && (
                                        <Error error={errors.email.message} />
                                    )}
                                    {errors.email?.type === 'required' && (
                                        <Error error="Email is required" />
                                    )}
                                    {errors.email?.type === 'min' && (
                                        <Error error="Min is 12" />
                                    )}
                                    {errors.email?.type === 'max' && (
                                        <Error error="Max is 50" />
                                    )}

                                    <InputField
                                        labelContent={t('checkout.telephone')}
                                        name="phonenumber"
                                        register={register}
                                        typeInput="tel"
                                        pattern="[0]{1}[0-9]{9}"
                                    />
                                    {errors.phonenumber?.type === 'tel' && (
                                        <Error
                                            error={errors.password.message}
                                        />
                                    )}
                                    {errors.phonenumber?.type ===
                                        'required' && (
                                            <Error error="Phone number is required" />
                                        )}
                                    {errors.phonenumber?.type === 'matches' && (
                                        <Error error="Phone number is invalid" />
                                    )}
                                    {errors.phonenumber?.type === 'min' && (
                                        <Error error="Min is 6" />
                                    )}
                                    {errors.phonenumber?.type === 'max' && (
                                        <Error error="Max is 50" />
                                    )}
                                </div>
                                <div>
                                    <InputField
                                        labelContent={t('checkout.streetAddress')}
                                        name="street"
                                        register={register}
                                        typeInput="text"
                                    />
                                    {errors.street?.type === 'required' && (
                                        <Error error="Street address name is required" />
                                    )}
                                    {errors.street?.type === 'min' && (
                                        <Error error="Min is 5" />
                                    )}
                                    {errors.street?.type === 'max' && (
                                        <Error error="Max is 120" />
                                    )}

                                    <p className="text-base dark:text-gray-200 font-bold ml-3">
                                        {t('checkout.city')}
                                    </p>
                                    {errorsLocation && (
                                        <Error error="Please choose address!" />
                                    )}
                                    <Select
                                        onChange={(data: any) => {
                                            setCurrentCity(data)
                                        }}
                                        className="text-lg ml-3 w-80 focus:border-blue-500 focus:outline-none rounded-sm mb-2"
                                        classNamePrefix="select"
                                        //value={currentCity}
                                        isSearchable={true}
                                        name="city"
                                        options={listCity}
                                        styles={customSelector}
                                        placeholder={t('checkout.placeholder')}
                                    />
                                    <p className="text-base dark:text-gray-200 font-bold ml-3">
                                        {t('checkout.district')}
                                    </p>
                                    <Select
                                        onChange={(data) => {
                                            if (data) {
                                                setCurrentDistrict(data)
                                            }
                                        }}
                                        className="text-lg ml-3 w-80 focus:border-blue-500 focus:outline-none rounded-sm mb-2"
                                        classNamePrefix="select"
                                        value={currentDistrict}
                                        isSearchable={true}
                                        name="district"
                                        options={listDistrict}
                                        styles={customSelector}
                                        placeholder={t('checkout.placeholder')}
                                    />
                                    <p className="text-base dark:text-gray-200 font-bold ml-3">
                                        {t('checkout.ward')}
                                    </p>
                                    <Select
                                        onChange={(data) => {
                                            if (data) {
                                                setCurrentWard(data)
                                            }
                                        }}
                                        className="text-lg ml-3 w-80 focus:border-blue-500 focus:outline-none rounded-sm mb-2"
                                        classNamePrefix="select"
                                        value={currentWard}
                                        isSearchable={true}
                                        name="ward"
                                        options={listWard}
                                        styles={customSelector}
                                        placeholder={t('checkout.placeholder')}
                                    />
                                </div>
                            </div>

                            <div className="text-center pb-4">
                                {stateCheckout === 'ADD_ADDRESS' ? (
                                    <input
                                        className="text-white hover:text-black py-2 rounded-md px-8 bg-blue-600 focus:outline-none active:bg-pink-500 hover:bg-yellow-400"
                                        type="submit"
                                        value={t('checkout.continue')}
                                    />
                                ) : (
                                        <input
                                            className="text-white hover:text-black py-2 rounded-md px-8 bg-blue-600 focus:outline-none active:bg-pink-500 hover:bg-yellow-400"
                                            disabled
                                            type="submit"
                                            value={t('checkout.continue')}
                                        />
                                    )}
                            </div>
                        </div>
                    </form>
                    <div
                        className={clsx(
                            stateCheckout !== 'ADD_PAYMENT'
                                ? 'w-full text-left mt-4 mx-auto bg-gray-200 opacity-50 cursor-not-allowed rounded-lg select-none'
                                : 'w-full text-left mt-4 mx-auto',
                        )}
                    >
                        <form onSubmit={handleSubmit2(onSubmit2)}>
                            <div className="flex-row justify-center">
                                <div className="flex dark:text-gray-200 dark:bg-gray-700 space-x-8 justify-center py-4">
                                    <div>
                                        <label className="text-lg">
                                            ZaloPay&nbsp;
                                            <input
                                                name="Payment"
                                                type="radio"
                                                value="ZaloPay"
                                                ref={register2({
                                                    required: true,
                                                })}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="text-lg">
                                            COD&nbsp;
                                            <input
                                                name="Payment"
                                                type="radio"
                                                value="COD"
                                                ref={register2({
                                                    required: true,
                                                })}
                                            />
                                        </label>
                                    </div>
                                </div>
                                {errors2.Payment?.type === 'required' && (
                                    <p className="text-center text-red-500">
                                        {t('checkout.requirePayment')}
                                    </p>
                                )}
                            </div>

                            <div className="text-center py-4 dark:bg-gray-700">
                                {stateCheckout === 'ADD_PAYMENT' ? (
                                    <input
                                        className="bg-red-700 text-gray-200 dark:bg-red-500 px-6 py-2 rounded-md"
                                        type="submit"
                                        value={t('checkout.continue')}
                                    />
                                ) : (
                                        <input
                                            className="bg-red-700 text-gray-200 dark:bg-red-500 px-6 py-2 rounded-md"
                                            disabled
                                            type="submit"
                                            value={t('checkout.continue')}
                                        />
                                    )}
                            </div>
                        </form>
                    </div>
                    <div
                        className={clsx(
                            stateCheckout !== 'PAYMENT'
                                ? 'w-full text-left mt-4 mx-auto bg-gray-200 dark:bg-gray-700 opacity-50 cursor-not-allowed rounded-lg select-none'
                                : 'w-full text-left mt-4 mx-auto',
                        )}
                    >
                        <div className="text-center py-4">
                            {stateCheckout === 'PAYMENT' ? (
                                <button
                                    className="bg-red-700 text-gray-200 dark:bg-red-500 px-6 py-2 rounded-md"
                                    onClick={handleClick}
                                >
                                    {t('checkout.pay')}
                                </button>
                            ) : (
                                    <button
                                        className="bg-red-700 text-gray-200 dark:bg-red-500 px-6 py-2 rounded-md"
                                        disabled
                                    >
                                        {t('checkout.pay')}
                                    </button>
                                )}
                        </div>
                    </div>
                </div>
            ) : (
                    <div className="p-4">
                        <p className="mt-40 text-4xl font-bold dark:bg-red-500 text-red-600">
                            {t('checkout.requireLogin')}
                        </p>
                    </div>
                )}
            <Footer />
        </>
    )
}

export default CheckOut
