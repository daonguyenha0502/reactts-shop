import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/dist/yup'
import * as yup from 'yup'
import { useHistory, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { InputField, Error } from '../components/InputField'
import userApi from '../api/userApi'
import { toast } from 'react-toastify'


export interface TypeRestorePassword {
    password: string
    re_password: string
}

const restorePasswordSchema = yup.object().shape({
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

const RestorePassword = (props: Props) => {
    const history = useHistory()
    const { search } = useLocation()
    const [errorRestorePassword, setErrorRestorePassword] = useState<string | null>(null)
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(restorePasswordSchema),
    })
    const onSubmit = async (data: TypeRestorePassword) => {
        if (data && search) {
            const response: any = await userApi.restorePassword(data, search)
            if (response.mess === 'Password changed!') {
                history.push('/login')
                toast.info(`Changed password!`, {
                    position: 'bottom-center',
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                setErrorRestorePassword(response.mess)
            }
        }
    }

    return (
        <div className="w-min h-auto text-left mt-28 sm:mt-32 mx-auto">

            <Helmet>
                <meta charSet="utf-8" />
                <title>Restore password</title>
                <link rel="canonical" href="cpt-ha.web.app" />
            </Helmet>

            <h1 className="font-bold text-2xl text-center mb-6">
                Restore password
                    </h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <InputField
                    name="password"
                    typeInput="password"
                    labelContent="New Password"
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
                    labelContent="New Re-password"
                    register={register}
                    autocomplete="new-password"
                />
                {errors.re_password?.type === 're_password' && (
                    <Error error={errors.re_password.message} />
                )}
                {errors.re_password?.type === 'match' && (
                    <Error error={errors.re_password.message} />
                )}
                {errorRestorePassword && <Error error={errorRestorePassword} />}

                <div className="mt-4 w-max mx-auto">
                    <button
                        className="bg-blue-600 w-48 text-white py-2 focus:outline-none active:bg-blue-500 rounded px-4 hover:bg-green-700"
                        type="submit"
                    >
                        Restore
                            </button>
                </div>
            </form>
        </div>
    )
}

export default RestorePassword
