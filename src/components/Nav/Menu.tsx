import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../stores/store'
import { deleteToken } from '../../stores/userSlice'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'
import { useTypeSafeTranslation } from '../../utility/useTypeSafeTranslation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'


interface Props {
    refSearch: any
    search: string
    handleSubmit: any
    setSearch: any
    theme: 'dark' | "light"
    darkMode: () => void
}

const Menu = ({ refSearch, search, handleSubmit, setSearch, theme, darkMode }: Props) => {
    const pathName = useLocation()
    const { t } = useTypeSafeTranslation()
    const users = useSelector((state: RootState) => state.users)
    const dispatch = useDispatch()
    const handleLogOut = async () => {
        try {
            const resultAction: any = await dispatch(deleteToken())
            if (deleteToken.fulfilled.match(resultAction)) {
                //console.log('Logout')
                await toast.info(`${t('nav.logout')}`, {
                    position: 'bottom-center',
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                if (resultAction.payload) {
                    console.log('error2')
                } else {
                    console.log('error1')
                }
            }
        } catch (error) {
            console.log('Failed to login ', error.message)
        }
    }

    return (
        <div className="w-4/5 transform translate-x-12/100 lg:hidden flex-row h-auto bg-gray-200 bg-opacity-80 dark:bg-black dark:bg-opacity-80 rounded-b-lg absolute top-12">
            <ul className="mt-2 w-min mx-auto space-x-4 items-center flex sm:flex md:flex lg:hidden">

                <li className="text-gray-200">
                    <input
                        ref={refSearch}
                        className="w-48 sm:w-56 pl-2 focus:outline-none focus:ring rounded text-black text-xl"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </li>
                <li className="h-auto text-gray-200">
                    <button
                        className="bg-green-600 dark:text-gray-200 p-1 focus:outline-none hover:bg-green-500 rounded px-4 active:bg-blue-700"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        {t('nav.search')}
                    </button>
                </li>
            </ul>
            <ul className="mt-2 w-min mx-auto flex-row sm:flex-row md:flex-row lg:hidden">
                {theme === 'dark' ? <li className="h-auto p-1 rounded-md cursor-pointer text-black">
                    <FontAwesomeIcon icon={faMoon} size='lg' onClick={() => darkMode()} />
                </li> : <li className="h-auto p-1 rounded-md cursor-pointer text-gray-200">
                        <FontAwesomeIcon icon={faSun} size='lg' onClick={() => darkMode()} />
                    </li>}
                {!users.accessToken ? (
                    <><Link className="cursor-pointer" to="/login">
                        <li className="px-10 bg-blue-500 hover:bg-blue-400 rounded-sm mb-2 text-black dark:text-gray-200 block sm:block md:block lg:hidden">

                            <span
                                className={
                                    pathName.pathname === '/login'
                                        ? 'text-red-500 whitespace-nowrap'
                                        : 'whitespace-nowrap'
                                }
                            >
                                {t('nav.login')}
                            </span>

                        </li>
                    </Link>
                        <Link className="cursor-pointer" to="/register">
                            <li className="px-10 bg-blue-500 hover:bg-blue-400 rounded-sm mb-2  text-black dark:text-gray-200 block sm:block md:block lg:hidden">

                                <span
                                    className={
                                        pathName.pathname === '/register'
                                            ? 'text-red-500 whitespace-nowrap'
                                            : 'whitespace-nowrap'
                                    }
                                >
                                    {t('nav.register')}
                                </span>{' '}

                            </li>
                        </Link>
                    </>
                ) : (
                        <>
                            <Link className="cursor-pointer" to="/profile">
                                <li className="px-10 bg-blue-500 hover:bg-blue-400 rounded-sm mb-2 text-black dark:text-gray-200 block sm:block md:block lg:hidden">

                                    <span
                                        className={
                                            pathName.pathname === '/profile'
                                                ? 'text-red-500 whitespace-nowrap'
                                                : 'whitespace-nowrap'
                                        }
                                    >
                                        {t('nav.profile')}
                                    </span>

                                </li>
                            </Link>
                            <Link
                                className="cursor-pointer"
                                onClick={() => handleLogOut()}
                                to="#"
                            >
                                <li className="px-10 text-black dark:text-gray-200 bg-blue-500 hover:bg-blue-400 rounded-sm mb-2 block sm:block md:block lg:hidden">

                                    {t('nav.logout')}{' '}

                                </li>
                            </Link>
                        </>
                    )}
            </ul>
        </div >
    )
}

export default Menu
