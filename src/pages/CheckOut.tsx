import React, { useState, useEffect, useCallback, useRef } from 'react'
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import clsx from 'clsx'
import { yupResolver } from '@hookform/resolvers/dist/yup'
import * as yup from 'yup';

import locationsApi from '../api/locationsApi'
import { InputField, Error } from '../components/InputField';
import { useSelector } from 'react-redux'
import type { RootState } from '../app/store';
import ListProductOnCheckout from '../components/ListProductOnCheckout';

//zalo pay
//import HmacSHA256 from 'crypto-js/hmac-sha256.js';
import CryptoJS from 'crypto-js'
import moment from 'moment'
import axios from 'axios'
const configZalo = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
}

const ZaloPay = async () => {
    const embed_data = {};

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        app_id: configZalo.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: "Haaaa",
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: 50000,
        description: `Test Payment for the order by H #${transID}`,
        bank_code: "zalopayapp",
        mac: ""
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data = await configZalo.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    order.mac = await CryptoJS.HmacSHA256(data, configZalo.key1).toString();
    console.log(order)
    axios.post(configZalo.endpoint, null, { params: order })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err));
}

interface Props {

}

const InformationSchema = yup.object().shape({
    email: yup.string().email().required().min(12).max(50),
    firstname: yup.string().required().min(2).max(50),
    lastname: yup.string().required().min(2).max(70),
    phonenumber: yup.string().matches(/0{1}[0-9]{2,10}/i).length(10),
    street: yup.string().required().min(5).max(120)
});

type LocationType = {
    value: string;
    label: string;
};
export type TypeCheckout = "VIEW_CART" | "ADD_ADDRESS" | "ADD_PAYMENT"

const customStyles = {
    input: (provided: any, state: any) => ({
        ...provided,
        margin: 0,
        fontSize: "1.125rem",
        lineHeight: "1.75rem",
        width: "20rem",
        paddingTop: "0.75rem",
        paddingBottom: "0.75rem",
        borderRadius: "0.375rem",
    }),
    control: (provided: any, state: any) => ({
        ...provided,
        borderRadius: "0.375rem",
        borderColor: `rgb(17, 24, 39)`,
        fontSize: "1.125rem",
        lineHeight: "1.75rem",
        padding: 0,
        margin: 0,
    }),
    valueContainer: (provided: any, state: any) => ({
        ...provided,
        padding: 0,
        margin: 0,
        marginLeft: "0.75rem",
        fontSize: "1.125rem",
        lineHeight: "1.75rem",
    }),
    placeholder: (provided: any, state: any) => ({
        ...provided,
        padding: 0,
        margin: 0,
        fontSize: "1.125rem",
        lineHeight: "1.75rem",

    }),
}

const CheckOut = (props: Props) => {

    const handlePayment = () => {
        ZaloPay()
    }

    const user = useSelector((state: RootState) => state.users)
    const [stateCheckout, setStateCheckout] = useState<TypeCheckout | 'VIEW_CART'>('VIEW_CART')
    const [errorsLocation, setErrorsLocation] = useState<boolean | false>(false)

    const [listCity, setListCity] = useState<LocationType[] | []>([])
    const [currentCity, setCurrentCity] = useState<LocationType | null>(null)
    const [listDistrict, setListDistrict] = useState<LocationType[] | []>([])
    const [currentDistrict, setCurrentDistrict] = useState<LocationType | null>(null)
    const [listWard, setListWard] = useState<LocationType[] | []>([])
    const [currentWard, setCurrentWard] = useState<LocationType | null>(null)

    const getCities = async () => {
        const res: any = await locationsApi.getListCity()
        const newObj = await res.map((itemLocation: any) => {
            return { value: itemLocation.MaTP, label: itemLocation.TenTP }
        })
        //console.log(newObj)
        setListCity(newObj)
    }

    const getDistricts = async (idCity: any) => {
        const res: any = await locationsApi.getListDistrict(idCity)
        //console.log(res)
        const newObj = await res.map((itemLocation: any) => {
            return { value: itemLocation.MaQH, label: itemLocation.TenQH }
        })
        //console.log(newObj)
        setListDistrict(newObj)
    }
    const getWards = async (idCity: any, idDistrict: any) => {
        const res: any = await locationsApi.getListWard(idCity, idDistrict)
        //console.log(res)
        const newObj = await res.map((itemLocation: any) => {
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


    const carts = useSelector((state: RootState) => state.carts);


    const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(InformationSchema) });
    const onSubmit = (data: any) => {
        if (currentCity && currentDistrict && currentWard) {
            setErrorsLocation(false)
            console.log({ ...data, city: currentCity.value, district: currentDistrict.value, ward: currentWard.value });
            setStateCheckout('ADD_PAYMENT')
        } else {
            setErrorsLocation(true)
        }
    }
    if (errors) {
        //console.log(errors);
    }

    return (
        <>
            {user.accessToken ? (
                <div className="w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 2xl:w-3/4 text-left py-20 mx-auto">
                    <h1 className="text-2xl text-red-700 text-center mb-4">This is checkout</h1>

                    <ListProductOnCheckout carts={carts} stateCheckout={stateCheckout} />
                    <div className="text-center mb-4">
                        <button className={clsx(stateCheckout === "VIEW_CART"
                            ? "text-white hover:text-black mx-auto py-2 rounded-md px-8 bg-blue-600 focus:outline-none active:bg-pink-500 hover:bg-yellow-400"
                            : "invisible")}
                            onClick={() => changeStateCheckout("ADD_ADDRESS")}
                        >Continue</button>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}>
                        <div className={clsx(stateCheckout === "ADD_ADDRESS" ? "flex-col w-min mx-auto justify-center lg:w-full lg:flex-row lg:flex pb-4" : "flex-col w-min mx-auto justify-center lg:w-full lg:flex-row lg:flex pb-4 bg-gray-200 opacity-50 pt-4 rounded-lg")}>

                            <div>
                                <InputField labelContent="First Name" name="firstname"
                                    register={register} typeInput="text" />
                                {errors.firstname?.type === 'required' && (
                                    <Error error="First name is required" />
                                )}
                                {errors.firstname?.type === 'min' && <Error error="Min is 2" />}
                                {errors.firstname?.type === 'max' && <Error error="Max is 50" />}


                                <InputField labelContent="Last Name" name="lastname"
                                    register={register} typeInput="text" />
                                {errors.lastname?.type === 'required' && (
                                    <Error error="Last name is required" />
                                )}
                                {errors.lastname?.type === 'min' && <Error error="Min is 2" />}
                                {errors.lastname?.type === 'max' && <Error error="Max is 70" />}

                                <InputField labelContent="Email" name="email"
                                    register={register} typeInput="email" />
                                {errors.email?.type === 'email' && (
                                    <Error error={errors.email.message} />
                                )}
                                {errors.email?.type === 'required' && (
                                    <Error error="Email is required" />
                                )}
                                {errors.email?.type === 'min' && <Error error="Min is 12" />}
                                {errors.email?.type === 'max' && <Error error="Max is 50" />}

                                <InputField labelContent="Telephone" name="phonenumber"
                                    register={register} typeInput="tel" pattern="[0]{1}[0-9]{9}" />
                                {errors.phonenumber?.type === 'tel' && (
                                    <Error error={errors.password.message} />
                                )}
                                {errors.phonenumber?.type === 'required' && (
                                    <Error error="Phone number is required" />
                                )}
                                {errors.phonenumber?.type === 'matches' && (
                                    <Error error="Phone number is invalid" />
                                )}
                                {errors.phonenumber?.type === 'min' && <Error error="Min is 6" />}
                                {errors.phonenumber?.type === 'max' && <Error error="Max is 50" />}

                            </div>
                            <div>

                                <InputField labelContent="Street address" name="street"
                                    register={register} typeInput="text" />
                                {errors.street?.type === 'required' && (
                                    <Error error="Street address name is required" />
                                )}
                                {errors.street?.type === 'min' && <Error error="Min is 5" />}
                                {errors.street?.type === 'max' && <Error error="Max is 120" />}

                                <p className="text-base font-bold ml-3">City</p>
                                {errorsLocation && (
                                    <Error error="Please choose address!" />
                                )}
                                <Select
                                    onChange={(data: any) => { setCurrentCity(data) }}
                                    className="text-lg ml-3 w-80 focus:border-blue-500 focus:outline-none rounded-sm mb-2"
                                    classNamePrefix="select"
                                    //value={currentCity}
                                    isSearchable={true}
                                    name="city"
                                    options={listCity}
                                    styles={customStyles}
                                />
                                <p className="text-base font-bold ml-3">District</p>
                                <Select
                                    onChange={(data) => { if (data) { setCurrentDistrict(data) } }}
                                    className="text-lg ml-3 w-80 focus:border-blue-500 focus:outline-none rounded-sm mb-2"
                                    classNamePrefix="select"
                                    value={currentDistrict}
                                    isSearchable={true}
                                    name="district"
                                    options={listDistrict}
                                    styles={customStyles}
                                />
                                <p className="text-base font-bold ml-3">Ward</p>
                                <Select
                                    onChange={(data) => { if (data) { setCurrentWard(data) } }}
                                    className="text-lg ml-3 w-80 focus:border-blue-500 focus:outline-none rounded-sm mb-2"
                                    classNamePrefix="select"
                                    value={currentWard}
                                    isSearchable={true}
                                    name="ward"
                                    options={listWard}
                                    styles={customStyles}
                                />

                            </div>
                        </div>
                        <div className="text-center pb-4">
                            <input className="text-white hover:text-black py-2 rounded-md px-8 bg-blue-600 focus:outline-none active:bg-pink-500 hover:bg-yellow-400" type="submit" />
                        </div>


                    </form>
                    <button className="bg-red-700 px-6 py-3" onClick={() => handlePayment()}>tets</button>

                </div>) : (<div className="p-4">
                    <p className="mt-40 text-4xl font-bold text-red-600">Please login to checkout</p>

                </div>)
            }
        </>

    )
}

export default CheckOut
