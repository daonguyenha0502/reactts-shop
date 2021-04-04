import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/dist/yup'
import * as yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import userApi from '../api/userApi'

import { InputField, Error } from '../components/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { saveToken } from '../stores/userSlice'
import { toast } from 'react-toastify'
import type { RootState } from 'src/stores/store'
import type { TypeResponse } from '../api/axiosClient'
import { useTypeSafeTranslation } from '../utility/useTypeSafeTranslation'

interface Props { }
export interface TypeLogin {
    email: string
    password: string
}

const loginSchema = yup.object().shape({
    email: yup.string().email().required().min(12).max(50),
    password: yup
        .string()
        .required()
        .matches(/^[a-zA-Z0-9 -]+/i)
        .min(6)
        .max(50),
})

const Login = (props: Props) => {
    const [errorLogin, setErrorLogin] = useState<string | null>(null)
    const history = useHistory()
    const { t } = useTypeSafeTranslation()
    const users = useSelector((state: RootState) => state.users)
    const dispatch = useDispatch()
    async function Login(infLogin: TypeLogin) {
        try {
            const response: TypeResponse = await userApi.login(infLogin)
            if (response.data.accessToken && response.data.refreshToken) {
                const action = saveToken(response.data)
                dispatch(action)
                history.push('/')
                toast.info(`${t('login.login')}`, {
                    position: 'bottom-center',
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                setErrorLogin(response.data)
            }
        } catch (error) {
            setErrorLogin(error.error.error)
        }

    }
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(loginSchema),
    })
    const onSubmit = (data: any) => {
        Login(data)
    }

    return (
        <div className="w-min min-h-screen text-left pt-36 mx-auto">
            {!users.accessToken && !users.refreshToken ? (
                <>
                    <Helmet>
                        <title>{t('login.login')}</title>
                        <link rel="canonical" href="https://cpt-ha.web.app" />
                    </Helmet>

                    <h1 className="font-bold dark:text-gray-200 text-black text-2xl text-center mb-6">
                        {t('login.login')}
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                            name="email"
                            typeInput="email"
                            labelContent="Email"
                            register={register}
                            onBlur={() => setErrorLogin(null)}
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
                            labelContent={t('login.password')}
                            register={register}
                            onBlur={() => setErrorLogin(null)}
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
                        {errorLogin && <Error error={errorLogin} />}
                        <div className="mb-3 w-max mx-auto">
                            <button
                                className="bg-blue-600 min-w-24 text-white py-2 focus:outline-none hover:bg-blue-500 rounded px-4 active::bg-red-600"
                                type="submit"
                            >
                                {t('login.login')}
                            </button>
                            <Link to="/register"><button type="button" className="bg-green-600 min-w-24 text-white py-2 focus:outline-none hover:bg-green-500 rounded px-4 active:bg-blue-700 ml-2">
                                {t('login.register')}
                            </button></Link>
                        </div>
                        <Link to="/forgotPassword"><p className="text-red-700 dark:text-red-500 text-base text-center">{t('login.forgot')}</p></Link>

                    </form>
                </>
            ) : (
                    <>
                        <h1 className="w-80">{t('login.message.login')}</h1>{' '}
                    </>
                )
            }
        </div >
    )
}

export default Login
