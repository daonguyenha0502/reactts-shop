import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { UploadImg } from '../../api/axiosClient'
import Error403 from '../Error403'
import { Helmet } from 'react-helmet-async'
import type { RootState } from '../../stores/store'
import { useSelector } from 'react-redux'
import { getRoleInToken } from '../../utility/decodeJwt'
import type { TypeUser } from '../../stores/userSlice'
import { useTypeSafeTranslation } from '../../utility/useTypeSafeTranslation'

interface Props {

}
const UploadImage = (props: Props) => {
    const user = useSelector((state: RootState) => state.users)
    const [role, setRole] = useState<string | 'user'>('user')

    const [url, setUrl] = useState<string | null>(null)
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = async (data: any) => {
        console.log(data.file[0])
        const response: any = await UploadImg(data.file[0])
        if (response.error) {
            console.log(response.error)
        } else {
            console.log(response.url)
            setUrl(response.url)
        }
    }
    //console.log(errors)
    useEffect(() => {
        async function getTK(user: TypeUser) {
            let tk = await getRoleInToken(user.accessToken)
            setRole(tk)
        }
        getTK(user)
    }, [])
    const { t } = useTypeSafeTranslation()
    return (
        <>
            {role === 'admin' ? (
                <><Helmet>
                    <title>{t('uploadImage.title')}</title>
                    <link rel="canonical" href="https://cpt-ha.web.app" />
                </Helmet>
                    <div className="py-16 min-h-screen w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 2xl:w-3/4 mx-auto">
                        <h1 className="font-bold dark:text-gray-200 text-black text-2xl text-center mb-6">
                            {t('uploadImage.title')}
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex-row md:flex w-auto h-auto justify-center items-center">
                                <div>
                                    <input className="border-2 dark:text-gray-200 focus:outline-none text-base mr-4" type="file" multiple accept="image/*" name="file" ref={register({ required: true })} />
                                </div>
                                <div>
                                    <input className=" px-4 mt-4 md:mt-0 py-2 dark:bg-blue-800 bg-blue-900 text-white rounded-md" type="submit" value={t('uploadImage.upload')} />
                                </div>
                            </div>
                            {errors.file?.type === 'required' && (
                                <div><p className="text-base text-red-600 text-center">{t('uploadImage.fileRequire')}</p></div>
                            )}

                        </form>
                        {url && (
                            <>
                                <p className="break-words text-sm select-all p-1 text-white bg-gray-600 text-center mx-auto my-4">{url}</p>
                                <img className="w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 2xl:w-3/4 h-auto mx-auto" src={url} alt="img" />
                            </>
                        )}

                    </div>
                </>
            ) : (
                    <Error403 />
                )}
        </>
    )
}

export default UploadImage
