import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/dist/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'

import { InputField, Error } from '../components/InputField';


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
            return this.parent.password === this.parent.re_password;
        })
        .required()
});

interface Props { }

const Register = (props: Props) => {
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(registerSchema),
    });
    const onSubmit = (data: any) => console.log(data);
    if (errors) {
        // console.log(errors.password);
        //console.log(errors.email);
        //console.log(errors.re_password);
    }

    return (
        <div className="w-min h-auto text-left mt-28 sm:mt-32 mx-auto">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
                <link rel="canonical" href="cpt-ha.web.app" />
            </Helmet>

            <h1 className="font-bold text-2xl text-center mb-6">Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    name="email"
                    typeInput="email"
                    labelContent="Email"
                    register={register}
                    autocomplete={'username'}
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
                {errors.password?.type === 'min' && <Error error="Min is 6" />}
                {errors.password?.type === 'max' && <Error error="Max is 50" />}

                <InputField
                    name="re_password"
                    typeInput="password"
                    labelContent="Re-password"
                    register={register}
                    autocomplete="new-password"
                />
                {errors.re_password?.type === 're_password' && (
                    <Error error={errors.re_password.message} />
                )}
                {errors.re_password?.type === 'match' && (
                    <Error error={errors.re_password.message} />
                )}

                <div className="mt-4 w-max mx-auto">
                    <button
                        className="bg-blue-600 w-24 text-white py-2 focus:outline-none active:bg-blue-500 rounded px-4 hover:bg-green-700"
                        type="submit"
                    >
                        Register
          </button>
                    <button className="bg-green-600 w-24 text-white py-2 focus:outline-none active:bg-green-500 rounded px-4 hover:bg-red-600 ml-8">
                        <Link to="/login">Login</Link>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
