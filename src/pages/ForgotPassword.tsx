import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/dist/yup'
import * as yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import userApi from '../api/userApi'

import { InputField, Error } from '../components/InputField'
import { toast } from 'react-toastify'
import type { TypeResponse } from '../api/axiosClient'

interface Props { }
export interface TypeForgotPassword {
    email: string
}

const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email().required().min(12).max(50),
})

const ForgotPassword = (props: Props) => {
    const [errorForgotPassword, setErrorForgotPassword] = useState<string | null>(null)

    async function Forgot(email: TypeForgotPassword) {
        const response: TypeResponse = await userApi.forgotPassword(email)
        if (response.data) {
            toast.info(`${response.data.message}`, {
                position: 'bottom-center',
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            setErrorForgotPassword(response.data.message)
        }
    }
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(forgotPasswordSchema),
    })
    const onSubmit = (data: any) => {
        Forgot(data)
    }

    return (
        <div className="w-min h-auto text-left mt-36 mx-auto">
            <Helmet>
                <title>Forgot password</title>
                <link rel="canonical" href="https://cpt-ha.web.app" />
            </Helmet>

            <h1 className="font-bold text-2xl text-center mb-6">
                Forgot password
                    </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    name="email"
                    typeInput="email"
                    labelContent="Email"
                    register={register}
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
                {errorForgotPassword && <Error error={errorForgotPassword} />}
                <div className="mb-3 w-max mx-auto">
                    <button
                        className="bg-blue-600 w-36 text-white py-2 focus:outline-none active:bg-blue-500 rounded px-4 hover:bg-red-600"
                        type="submit"
                    >
                        Submit
                            </button>
                </div>
            </form>
            <p className="text-red-900 text-base text-center">You had account?</p>
            <div className="mb-3 w-max mx-auto">
                <Link to="/login"><button type="button" className="bg-green-600 w-36 text-white py-2 focus:outline-none active:bg-green-500 rounded px-4 hover:bg-blue-700">
                    Login
                </button></Link>
            </div>

        </div>
    )
}

export default ForgotPassword
