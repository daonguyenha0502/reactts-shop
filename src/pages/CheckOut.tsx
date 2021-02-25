import React, { useState, useEffect, useCallback, useRef } from 'react'
import Select from 'react-select';
import { useForm } from 'react-hook-form';

import locationsApi from '../api/locationsApi'
import { InputField } from '../components/InputField';
import { useSelector } from 'react-redux'
import type { RootState } from '../app/store';

interface Props {

}
type LocationType = {
    value: string;
    label: string;
};

const CheckOut = (props: Props) => {
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
    const carts = useSelector((state: RootState) => state.carts);

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data: any) => console.log(data);
    console.log(errors);
    return (
        <div className="w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 2xl:w-3/4 text-left mt-20 mx-auto">
            <h1 className="text-2xl text-red-700 text-center mb-4">This is checkout</h1>
            <div className="mx-auto overflow-y-auto h-1/2 xl:h-5/6 max-w-min mb-4">
                {carts.map((item) => (<div className="w-92 sm:w-120 h-auto border-gray-800 border rounded-lg leading-5 mb-8">
                    <div className="flex min-h-32">
                        <img
                            className="border-gray-800 w-28 h-auto border-r py-2 rounded-l-md"
                            //width="150px"
                            //height="auto"
                            src={item.img}
                            alt=""
                        />
                        <div className="flex-row text-center w-full py-2 relative">
                            <div className="flex mx-4">
                                <p className="text-center text-sm sm:text-base font-bold">
                                    {item.name}
                                </p>

                            </div>
                            <p>Price: {(item.cartAmount * item.price).toLocaleString()} Đồng</p>
                            <div className="flex w-full justify-center absolute bottom-2">

                            </div>
                        </div>
                    </div>
                </div>))

                }
            </div>
            <form className="flex-col w-min mx-auto justify-center lg:w-full lg:flex-row lg:flex" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputField labelContent="First Name" name="firstname" register={register} typeInput="text" />
                    <InputField labelContent="Last Name" name="lastname" register={register} typeInput="text" />
                    <InputField labelContent="Email" name="email" register={register} typeInput="email" />
                    <InputField labelContent="Telephone" name="phonenumber" register={register} typeInput="tel" />

                </div>
                <div>
                    <InputField labelContent="Street address" name="street" register={register} typeInput="text" />
                    <p className="text-base font-bold py-2 ml-3">City</p>
                    <Select
                        onChange={(data: any) => { setCurrentCity(data) }}
                        className="text-lg ml-3 w-80 focus:border-blue-500 focus:outline-none border border-gray-900 rounded-sm"
                        classNamePrefix="select"
                        //value={currentCity}
                        //defaultValue={options[0]}
                        isClearable={true}
                        isSearchable={true}
                        name="color"
                        options={listCity}
                    />
                    <p className="text-base py-2 font-bold ml-3">District</p>
                    <Select
                        onChange={(data) => { if (data) { setCurrentDistrict(data) } }}
                        className="text-lg w-80 ml-3 focus:border-blue-500 focus:outline-none border border-gray-900 rounded-sm"
                        classNamePrefix="select"
                        value={currentDistrict}
                        //defaultValue={options[0]}
                        isClearable={true}
                        isSearchable={true}
                        name="color"
                        options={listDistrict}
                    />
                    <p className="text-base font-bold py-2 ml-3">Ward</p>
                    <Select
                        onChange={(data) => { if (data) { setCurrentWard(data) } }}
                        className="text-lg w-80 ml-3 focus:border-blue-500 focus:outline-none border border-gray-900 rounded-sm"
                        classNamePrefix="select"
                        value={currentWard}
                        //defaultValue={options[0]}
                        isClearable={true}
                        isSearchable={true}
                        name="color"
                        options={listWard}
                    />
                    <input className="text-white hover:text-black py-2 mt-4 rounded-md px-8 bg-blue-600 focus:outline-none active:bg-pink-500 hover:bg-yellow-400" type="submit" />
                </div>


            </form>

        </div>
    )
}

export default CheckOut
