import React, { useState, useEffect, useCallback, useRef, ChangeEvent } from 'react'
import Select from 'react-select';
import { useForm } from 'react-hook-form';

import locationsApi from '../api/locationsApi'
import { InputField } from '../components/InputField';
import { useSelector } from 'react-redux'
import type { RootState } from '../app/store';

interface Props {

}
type TypeLocationCity = {
    MaTP: string;
    TenTP: string;
};
type TypeLocationDistrict = {
    MaQH: string;
    TenQH: string;
    MaTP: string;

};
type TypeLocationWard = {
    MaXP: string;
    TenXa: string;
    MaQH: string;
};


const TestCheckOut = (props: Props) => {
    const [listCity, setListCity] = useState<TypeLocationCity[] | []>([])
    const [currentCity, setCurrentCity] = useState<string | ''>('')
    const [listDistrict, setListDistrict] = useState<TypeLocationDistrict[] | []>([])
    const [currentDistrict, setCurrentDistrict] = useState<string | ''>('')
    const [listWard, setListWard] = useState<TypeLocationWard[] | []>([])
    const [currentWard, setCurrentWard] = useState<string | ''>('')


    const getCities = async () => {
        const res: any = await locationsApi.getListCity()
        setListCity(res)
    }

    const getDistricts = async (idCity: any) => {
        const res: any = await locationsApi.getListDistrict(idCity)

        //console.log(res)
        setListDistrict(res)
    }
    const getWards = async (idCity: any, idDistrict: any) => {
        const res: any = await locationsApi.getListWard(idCity, idDistrict)
        //console.log(res)
        setListWard(res)
    }
    useEffect(() => {
        getCities()
    }, [])

    useEffect(() => {
        if (currentCity) {
            setCurrentDistrict('')
            setCurrentWard('')
            getDistricts(currentCity)
        }

    }, [currentCity])

    useEffect(() => {
        if (currentDistrict && currentCity) {
            setCurrentWard('')
            getWards(currentCity, currentDistrict)
        }

    }, [currentDistrict])

    const carts = useSelector((state: RootState) => state.carts);

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data: any) => console.log(data);
    console.log(errors);
    return (
        <div className="w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 2xl:w-3/4 text-left mt-20 mx-auto py-4">
            <h1 className="text-2xl text-red-700 text-center mb-4">This is checkout</h1>
            <div className="mx-auto overflow-y-auto h-1/2 xl:h-5/6 max-w-min mb-4">
                {carts.map((item) =>
                    (<div key={item._id} className="w-80 sm:w-100 md:w-120 h-auto border-gray-800 border rounded-lg leading-5 mb-8">
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

                    <label className="font-bold ml-4"
                        htmlFor="city">City </label>
                    <div className="mb-2 w-92">

                        <select value={currentCity}
                            placeholder="Please choose city"
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => { setCurrentCity(e.target.value) }}
                            className="text-xl ml-3 w-80 pl-2 py-3 focus:border-blue-500 focus:outline-none border border-gray-900 rounded-md"
                            name="city"
                            id="city"
                            ref={register({ required: true })}>

                            <option key="0" value='' disabled>Please choose city</option>
                            {(listCity as TypeLocationCity[]).map((itemCity: TypeLocationCity) =>
                                <option key={itemCity.MaTP} value={itemCity.MaTP}>{itemCity.TenTP}</option>
                            )}

                        </select>
                    </div>

                    <label className="font-bold ml-4"
                        htmlFor="district">District </label>
                    <div className="mb-2 w-92">

                        <select value={currentDistrict}
                            placeholder="Please choose district"
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                setCurrentDistrict(e.target.value)
                            }}
                            className="text-xl ml-3 w-80 pl-2 py-3 focus:border-blue-500 focus:outline-none border border-gray-900 rounded-md"
                            name="district"
                            id="district"
                            ref={register({ required: true })}>

                            <option key="0" value='' disabled>Please choose district</option>)
                        {(listDistrict as TypeLocationDistrict[]).map(
                                (itemDistrict: TypeLocationDistrict) =>
                                    <option key={itemDistrict.MaQH} value={itemDistrict.MaQH}>{itemDistrict.TenQH}</option>
                            )}

                        </select></div>

                    <label className="font-bold ml-4"
                        htmlFor="ward">Ward </label>
                    <div className="mb-2 w-92">
                        <select value={currentWard}
                            placeholder="Please choose ward"
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                setCurrentWard(e.target.value)
                            }}
                            className="text-lg ml-3 w-80 pl-2 py-3 focus:border-blue-500 focus:outline-none border border-gray-900 rounded-md"
                            name="ward"
                            id="ward"
                            ref={register({ required: true })}>
                            <option key="0" value='' disabled>Please choose ward</option>
                            {(listWard as TypeLocationWard[]).map((itemWard: TypeLocationWard) =>
                                <option key={itemWard.MaXP} value={itemWard.MaXP}>{itemWard.TenXa}</option>
                            )}
                        </select></div>


                    <input className="text-white hover:text-black py-2 mt-4 rounded-md px-8 bg-blue-600 focus:outline-none active:bg-pink-500 hover:bg-yellow-400" type="submit" />
                </div>


            </form>

        </div>
    )
}

export default TestCheckOut
