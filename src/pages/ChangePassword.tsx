import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/dist/yup'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { InputField, Error } from '../components/InputField'
import userApi from '../api/userApi'
import { toast } from 'react-toastify'


export interface TypeChangePassword {
    //email: string
    oldPassword: string
    password: string
    re_password: string
}

const changePasswordSchema = yup.object().shape({
    oldPassword: yup
        .string()
        .required()
        .matches(/^[a-zA-Z0-9 -]+/i)
        .min(6)
        .max(50),
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

const ChangePassword = (props: Props) => {
    const history = useHistory()
    const [errorChangePassword, setErrorChangePassword] = useState<string | null>(null)
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(changePasswordSchema),
    })
    const onSubmit = async (data: TypeChangePassword) => {

        const response: any = await userApi.changePassword(data)
        if (response === 'Changed password') {
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
            setErrorChangePassword(response)
        }
    }

    return (
        <div className="w-min h-auto text-left mt-28 sm:mt-32 mx-auto">
            <Helmet>
                <title>Change password</title>
                <link rel="canonical" href="https://cpt-ha.web.app" />
            </Helmet>

            <h1 className="font-bold text-2xl text-center mb-6">
                Change password
                    </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    name="oldPassword"
                    typeInput="password"
                    labelContent="Old Password"
                    register={register}
                    autocomplete={'password'}
                />
                {errors.oldPassword?.type === 'password' && (
                    <Error error={errors.oldPassword.message} />
                )}
                {errors.oldPassword?.type === 'required' && (
                    <Error error="Password is required" />
                )}
                {errors.oldPassword?.type === 'matches' && (
                    <Error error="Password is invalid" />
                )}
                {errors.oldPassword?.type === 'min' && (
                    <Error error="Min is 6" />
                )}
                {errors.oldPassword?.type === 'max' && (
                    <Error error="Max is 50" />
                )}

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
                {errorChangePassword && <Error error={errorChangePassword} />}

                <div className="mt-4 w-max mx-auto">
                    <button
                        className="bg-blue-600 w-48 text-white py-2 focus:outline-none active:bg-blue-500 rounded px-4 hover:bg-green-700"
                        type="submit"
                    >
                        Change Password
                            </button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword
