import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/dist/yup'
import * as yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { InputField, Error } from '../components/InputField'
import userApi from '../api/userApi'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import type { RootState } from '../stores/store'
import type { TypeResponse } from '../api/axiosClient'
import { useTypeSafeTranslation } from '../utility/useTypeSafeTranslation'

export interface TypeRegister {
    email: string
    password: string
    re_password: string
}

const registerSchema = yup.object().shape({
    email: yup.string().email().required().min(12).max(50),
    password: yup
        .string()
        .required()
        .matches(/^[a-zA-Z0-9 -]+/i)
        .min(6)
        .max(50),
    re_password: yup
        .mixed()
        .test('match', 'Password not math re-password', function () {
            return this.parent.password === this.parent.re_password
        })
        .required(),
})

interface Props { }

const Register = (props: Props) => {
    const history = useHistory()
    const users = useSelector((state: RootState) => state.users)
    const [errorRegister, setErrorRegister] = useState<string | null>(null)
    const { t } = useTypeSafeTranslation()
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(registerSchema),
    })
    const onSubmit = async (data: TypeRegister) => {
        try {
            const response: TypeResponse = await userApi.register(data)
            if (response.data) {
                history.push('/login')
                toast.info(`${t('register.message.register')}`, {
                    position: 'bottom-center',
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                console.log(response)
            }
        } catch (error) {
            setErrorRegister(error.error.error)
        }
    }
    return (
        <div className="w-min min-h-screen text-left pt-28 sm:pt-32 mx-auto">
            {!users.accessToken && !users.refreshToken ? (
                <>
                    <Helmet>
                        <title>{t("register.register")}</title>
                        <link rel="canonical" href="https://cpt-ha.web.app" />
                    </Helmet>

                    <h1 className="font-bold dark:text-gray-200 text-black text-2xl text-center mb-6">
                        {t("register.register")}
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <InputField
                            name="email"
                            typeInput="email"
                            labelContent="Email"
                            register={register}
                            autocomplete={'username'}
                            onBlur={() => setErrorRegister(null)}

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
                            name="password"
                            typeInput="password"
                            labelContent={t('register.password')}
                            register={register}
                            autocomplete="new-password"
                        />
                        {errors.password?.type === 'password' && (
                            <Error error={errors.password.message} />
                        )}
                        {errors.password?.type === 'required' && (
                            <Error error="Password is required" />
                        )}
                        {errors.password?.type === 'matches' && (
                            <Error error="Password is invalid" />
                        )}
                        {errors.password?.type === 'min' && (
                            <Error error="Min is 6" />
                        )}
                        {errors.password?.type === 'max' && (
                            <Error error="Max is 50" />
                        )}

                        <InputField
                            name="re_password"
                            typeInput="password"
                            labelContent={t('register.re_password')}
                            register={register}
                            autocomplete="new-password"
                        />
                        {errors.re_password?.type === 're_password' && (
                            <Error error={errors.re_password.message} />
                        )}
                        {errors.re_password?.type === 'match' && (
                            <Error error={errors.re_password.message} />
                        )}
                        {errorRegister && <Error error={errorRegister} />}

                        <div className="mt-4 w-max mx-auto">
                            <button
                                className="bg-red-600 min-w-24 text-white py-2 focus:outline-none active:bg-blue-500 rounded px-4 hover:bg-red-500"
                                type="submit"
                            >
                                {t("register.register")}
                            </button>
                            <Link to="/login"><button type="button" className="bg-blue-700 min-w-24 text-white py-2 focus:outline-none active:bg-green-500 rounded px-4 hover:bg-blue-600 ml-8">
                                {t("register.login")}
                            </button></Link>
                        </div>
                    </form>
                </>
            ) : (
                    <>
                        {' '}
                        <h1 className="w-80">{t("login.message.login")}</h1>{' '}
                    </>
                )}
        </div>
    )
}

export default Register
