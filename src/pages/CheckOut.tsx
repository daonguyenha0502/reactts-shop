import React, { useState, useEffect, useCallback, useRef } from 'react'
import Select from 'react-select';
import { useForm } from 'react-hook-form';

import locationsApi from '../api/locationsApi'
import { InputField } from '../components/InputField';
import { useSelector } from 'react-redux'
import type { RootState } from '../app/store';
import ListProductOnCheckout from '../components/ListProductOnCheckout';

interface Props {

}
type LocationType = {
    value: string;
    label: string;
};
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
    const user = useSelector((state: RootState) => state.users)
    const [stateCart, setStateCart] = useState<string | ''>('')

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
    if (user) {
        useEffect(() => {
            getCities()
        }, [])

        useEffect(() => {
            if (currentCity) {
                setCurrentDistrict(null)
                setCurrentWard(null)
                getDistricts(currentCity.value)
            }

        }, [currentCity?.value])
        useEffect(() => {
            if (currentDistrict && currentCity) {
                setCurrentWard(null)
                getWards(currentCity.value, currentDistrict.value)
            }

        }, [currentDistrict?.value])
    }


    const carts = useSelector((state: RootState) => state.carts);


    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data: any) => console.log(data);
    console.log(errors);
    return (
        <>
            {user.accessToken ? (
                <div className="w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 2xl:w-3/4 text-left mt-20 mx-auto">
                    <h1 className="text-2xl text-red-700 text-center mb-4">This is checkout</h1>

                    <ListProductOnCheckout carts={carts} />
                    <form className="flex-col w-min mx-auto justify-center lg:w-full lg:flex-row lg:flex" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <InputField labelContent="First Name" name="firstname" register={register} typeInput="text" />
                            <InputField labelContent="Last Name" name="lastname" register={register} typeInput="text" />
                            <InputField labelContent="Email" name="email" register={register} typeInput="email" />
                            <InputField labelContent="Telephone" name="phonenumber" register={register} typeInput="tel" />

                        </div>
                        <div>

                            <InputField labelContent="Street address" name="street" register={register} typeInput="text" />


                            <p className="text-base font-bold ml-3">City</p>
                            <Select
                                onChange={(data: any) => { setCurrentCity(data) }}
                                className="text-lg ml-3 w-80 focus:border-blue-500 focus:outline-none rounded-sm mb-2"
                                classNamePrefix="select"
                                //value={currentCity}
                                //defaultValue={options[0]}
                                //isClearable={true}
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
                                //defaultValue={options[0]}
                                //isClearable={true}
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
                                //defaultValue={options[0]}
                                //isClearable={true}
                                isSearchable={true}
                                name="ward"
                                options={listWard}
                                styles={customStyles}
                            />
                            <input className="text-white hover:text-black py-2 mt-4 rounded-md px-8 bg-blue-600 focus:outline-none active:bg-pink-500 hover:bg-yellow-400" type="submit" />
                        </div>


                    </form>

                </div>) : (<div className="p-4">
                    <p className="mt-40 text-4xl font-bold text-red-600">Please login to checkout</p>

                </div>)
            }
        </>

    )
}

export default CheckOut
