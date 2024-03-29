import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import type { RootState } from '../../stores/store'
import Error403 from '../Error403'
import { getRoleInToken } from '../../utility/decodeJwt'
import { yupResolver } from '@hookform/resolvers/dist/yup'
import * as yup from 'yup'
import carouselApi from '../../api/carouselApi'
import type { TypeUser } from '../../stores/userSlice'
import { Helmet } from 'react-helmet-async'
import { InputField, Error } from '../../components/InputField';
import type { TypeResponse } from '../../api/axiosClient';
import { toast } from 'react-toastify';
import { useTypeSafeTranslation } from '../../utility/useTypeSafeTranslation';

interface Props {

}

export interface TypeCarousel {
    img: string
    url: string
    alt: string
}

const carouselSchema = yup.object().shape({
    img: yup.string().url().required().min(12).max(120),
    url: yup
        .string()
        .required()
        .matches(/^[a-zA-Z0-9 -]+/i)
        .min(5)
        .max(50),
    alt: yup
        .string()
        .required()
        .matches(/^[a-zA-Z0-9 -]+/i)
        .min(3)
        .max(50),
})

const AddCarousel = (props: Props) => {
    const user = useSelector((state: RootState) => state.users)
    const [role, setRole] = useState<string | 'user'>('user')
    const [errorAddCarousel, setErrorAddCarousel] = useState<string | null>(null)
    const [pressButton, setPressButton] = useState<boolean | false>(false)
    useEffect(() => {
        async function getTK(user: TypeUser) {
            let tk = await getRoleInToken(user.accessToken)
            setRole(tk)
        }
        getTK(user)
    }, [])

    const { register, handleSubmit, errors, reset } = useForm({
        resolver: yupResolver(carouselSchema),
    })
    const onSubmit = async (data: TypeCarousel) => {
        if (!pressButton) {
            saveCarousel(data)
        }
        else {
            console.log('wait..')
        }

    }
    const saveCarousel = async (data: any) => {
        setPressButton(true)
        try {
            const response: TypeResponse = await carouselApi.saveCarousel(data)
            if (response.data) {
                //console.log(response)
                toast.info(`${response.data.message}`, {
                    position: 'bottom-center',
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                reset({ img: "", url: "", alt: "" })
                setPressButton(false)
            }
        } catch (error) {
            setErrorAddCarousel(error.error.error)
            //console.log(error)
        }

    }
    //console.log(errors);
    const { t } = useTypeSafeTranslation()

    return (
        <>
            {role === 'admin' ? (
                <>
                    <Helmet>
                        <title>{t('addCarousel.title')}</title>
                        <link rel="canonical" href="https://cpt-ha.web.app" />
                    </Helmet>
                    <div className="w-min min-h-screen text-left pt-36 mx-auto">
                        <h1 className="font-bold dark:text-gray-200 text-black text-2xl text-center mb-6">
                            {t('addCarousel.title')}
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <InputField
                                name="img"
                                typeInput="url"
                                labelContent="URL Image"
                                register={register}
                                placeholder="URL Image"
                                onBlur={() => setErrorAddCarousel(null)}
                            />
                            {errors.img?.type === 'required' && (
                                <Error error="URL Image is required" />
                            )}
                            {errors.img?.type === 'url' && (
                                <Error error={errors.img.message} />
                            )}
                            {errors.img?.type === 'min' && (
                                <Error error="Min is 12" />
                            )}
                            {errors.img?.type === 'max' && (
                                <Error error="Max is 120" />
                            )}
                            <InputField
                                name="url"
                                typeInput="text"
                                labelContent="URL Blog"
                                register={register}
                                placeholder="URL Blog"
                                onBlur={() => setErrorAddCarousel(null)}
                            />
                            {errors.url?.type === 'required' && (
                                <Error error="URL Blog is required" />
                            )}
                            {errors.url?.type === 'min' && (
                                <Error error="Min is 5" />
                            )}
                            {errors.url?.type === 'max' && (
                                <Error error="Max is 50" />
                            )}
                            <InputField
                                name="alt"
                                typeInput="text"
                                labelContent="Alt"
                                register={register}
                                placeholder="Alt"
                                onBlur={() => setErrorAddCarousel(null)}
                            />
                            {errors.alt?.type === 'required' && (
                                <Error error="Alt of image is required" />
                            )}
                            {errors.alt?.type === 'min' && (
                                <Error error="Min is 3" />
                            )}
                            {errors.alt?.type === 'max' && (
                                <Error error="Max is 50" />
                            )}
                            {errorAddCarousel && <Error error={errorAddCarousel} />}

                            <div className="mb-3 w-max mx-auto">
                                <button
                                    className="bg-blue-600 w-24 text-white py-2 focus:outline-none hover:bg-blue-500 rounded px-4 active:bg-red-600"
                                    type="submit"
                                >
                                    {t('addCarousel.save')}
                                </button>
                            </div>
                        </form>
                    </div>
                </>) : (<><Error403 /> </>)}
        </>
    )
}

export default AddCarousel

