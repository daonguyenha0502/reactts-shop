import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/dist/yup'
import * as yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import userApi from '../api/userApi'

import { InputField, Error } from '../components/InputField'
import { useSelector, useDispatch } from 'react-redux'
import { saveToken } from '../stores/userSlice'
import { toast } from 'react-toastify'

interface Props { }

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
    const dispatch = useDispatch()
    async function Login(info: any) {
        const response: any = await userApi.login(info)
        if (response.accessToken && response.refreshToken) {
            //console.log(response)
            const action = saveToken(response)
            dispatch(action)
            //console.log('save token')
            history.push('/')
            toast.info(`You are logged in`, {
                position: 'bottom-center',
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            //console.log(response)
            setErrorLogin(response)
        }
        //console.log()
    }
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(loginSchema),
    })
    const onSubmit = (data: any) => {
        //console.log(data);
        Login(JSON.stringify(data))
    }
    if (errors) {
        // console.log(errors.password);
        //console.log(errors.email);
    }

    return (
        <div className="w-min h-auto text-left mt-36 mx-auto">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
                <link rel="canonical" href="cpt-ha.web.app" />
            </Helmet>

            <h1 className="font-bold text-2xl text-center mb-6">Login</h1>
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
                {errors.email?.type === 'min' && <Error error="Min is 12" />}
                {errors.email?.type === 'max' && <Error error="Max is 50" />}
                <InputField
                    name="password"
                    typeInput="password"
                    labelContent="Password"
                    register={register}
                />
                {errors.email?.type === 'password' && (
                    <Error error={errors.email.password} />
                )}
                {errors.password?.type === 'required' && (
                    <Error error="Password is required" />
                )}
                {errors.password?.type === 'matches' && (
                    <Error error="Password is invalid" />
                )}
                {errors.password?.type === 'min' && <Error error="Min is 6" />}
                {errors.password?.type === 'max' && <Error error="Max is 50" />}
                {errorLogin && <Error error={errorLogin} />}
                <div className="mb-3 w-max mx-auto">
                    <button
                        className="bg-blue-600 w-24 text-white py-2 focus:outline-none active:bg-blue-500 rounded px-4 hover:bg-red-600"
                        type="submit"
                    >
                        Login
                    </button>
                    <button className="bg-green-600 w-24 text-white py-2 focus:outline-none active:bg-green-500 rounded px-4 hover:bg-blue-700 ml-2">
                        <Link to="/register">Register</Link>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login
