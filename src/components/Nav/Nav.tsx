import React, { useRef, useState } from 'react'

import { Link, useHistory } from 'react-router-dom'

import LinkItemCart from '../Cart/LinkItemCart'
import { faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Menu from './Menu'

import { faReact } from '@fortawesome/free-brands-svg-icons'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteToken } from '../../stores/userSlice'
import type { RootState } from '../../stores/store'
import { toast } from 'react-toastify'
import { useTypeSafeTranslation } from '../../utility/useTypeSafeTranslation'
import type { TypeTheme } from '../../stores/themeSlice'

interface Props {
    changeTheme: () => void,
    theme: TypeTheme
}

const Nav = ({ changeTheme, theme }: Props) => {
    const [search, setSearch] = useState('')
    const [isOpenMenu, setIsOpenMenu] = useState<boolean | false>(false)
    const carts = useSelector((state: RootState) => state.carts)
    const users = useSelector((state: RootState) => state.users)
    const dispatch = useDispatch()
    const pathName = useLocation()
    const refSearch = useRef<HTMLInputElement | null>(null)
    let history = useHistory()
    const { t } = useTypeSafeTranslation()
    const handleSearch = async (search: string) => {
        //console.log(search);
        history.push(`/search?q=${search}`)
    }

    const handleLogOut = async () => {
        const resultAction: any = await dispatch(deleteToken())
        if (deleteToken.fulfilled.match(resultAction)) {
            //console.log('Logout');
            await toast.info(`Logout`, {
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
                console.log(resultAction.payload)
                await toast.warning(
                    `${resultAction.payload.status}: ${resultAction.payload.data}`,
                    {
                        position: 'bottom-center',
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    },
                )
            } else {
                console.log('error')
                await toast.error(`500`, {
                    position: 'bottom-center',
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault()

        if (refSearch.current) {
            if (!search) {
                refSearch.current.focus()
            } else {
                handleSearch(search)
                setSearch('')
            }
        }
    }

    return (
        <>
            <nav className="lg:flex font-semibold w-full h-12 bg-blue-700 dark:bg-gray-700 fixed top-0 z-50">
                <ul className="text-gray-200 h-12 lg:w-1/2 sm:w-full w-full justify-center flex space-x-4 items-center">
                    <li className="w-36 h-auto ">
                        <Link className="cursor-pointer" to="/">
                            <FontAwesomeIcon icon={faReact} size="2x" />
                        </Link>
                    </li>
                    <li className="w-36">
                        <Link className="cursor-pointer" to="/cart">
                            <LinkItemCart cartItems={carts} />{' '}
                            <span
                                className={
                                    pathName.pathname === '/cart'
                                        ? 'border-gray-200 border-b-2'
                                        : ''
                                }
                            >
                                {t('nav.cart')}
                            </span>
                        </Link>
                    </li>

                    {!users.accessToken ? (
                        <>
                            <li className="w-36  hidden sm:hidden md:hidden lg:block">
                                <Link className="cursor-pointer" to="/login">
                                    <span
                                        className={
                                            pathName.pathname === '/login'
                                                ? 'border-gray-200 border-b-2'
                                                : ''
                                        }
                                    >
                                        {t('nav.login')}
                                    </span>
                                </Link>
                            </li>
                            <li className="w-36  hidden sm:hidden md:hidden lg:block">
                                <Link className="cursor-pointer" to="/register">
                                    <span
                                        className={
                                            pathName.pathname === '/register'
                                                ? 'border-gray-200 border-b-2'
                                                : ''
                                        }
                                    >
                                        {t('nav.register')}
                                    </span>
                                </Link>
                            </li>
                        </>
                    ) : (
                            <>
                                <li className="w-36  hidden sm:hidden md:hidden lg:block">
                                    <Link to="/profile">
                                        <span
                                            className={
                                                pathName.pathname === '/profile'
                                                    ? 'border-gray-200 border-b-2'
                                                    : ''
                                            }
                                        >
                                            {t('nav.profile')}
                                        </span>
                                    </Link>
                                </li>
                                <li className="w-36  hidden sm:hidden md:hidden lg:block">
                                    <Link
                                        className="cursor-pointer"
                                        to="#"
                                        onClick={() => handleLogOut()}
                                    >
                                        <span
                                            className={
                                                pathName.pathname === '/logout'
                                                    ? 'border-gray-200 border-b-2'
                                                    : ''
                                            }
                                        >
                                            {t('nav.logout')}
                                        </span>
                                    </Link>
                                </li>
                            </>
                        )}

                    <li
                        className="w-36 block sm:block md:block lg:hidden cursor-pointer"
                        onClick={() => setIsOpenMenu(!isOpenMenu)}
                    >
                        <FontAwesomeIcon
                            icon={faBars}
                            size="2x"
                            color="white"
                        />
                    </li>
                </ul>
                {isOpenMenu && (
                    <Menu
                        theme={theme.theme}
                        darkMode={changeTheme}
                        refSearch={refSearch}
                        search={search}
                        handleSubmit={onSubmit}
                        setSearch={setSearch}
                    />
                )}
                <ul className="w-1/2 justify-end space-x-4 items-center mr-4 hidden sm:hidden md:hidden lg:flex">
                    {theme.theme === 'dark' ? <li className="h-auto p-1 rounded-md cursor-pointer text-black">
                        <FontAwesomeIcon icon={faMoon} size='lg' onClick={() => changeTheme()} />
                    </li> : <li className="h-auto p-1 rounded-md cursor-pointer text-gray-200">
                            <FontAwesomeIcon icon={faSun} size='lg' onClick={() => changeTheme()} />
                        </li>}

                    <form
                        className="flex justify-end space-x-4 items-center"
                        onSubmit={onSubmit}
                    >
                        <li className="text-gray-200">
                            {/* <label className="text-gray-800" htmlFor="search">Search</label> */}
                            <input
                                ref={refSearch}
                                className="w-56 pl-2 focus:outline-none focus:ring rounded text-black text-xl dark:bg-gray-600 dark:text-gray-100"
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                id="search"
                            />

                        </li>
                        <li className="h-auto text-gray-200">
                            <button
                                className="bg-green-600 text-black dark:text-gray-200 p-1 focus:outline-none hover:bg-green-500 rounded px-4 active:bg-blue-700"
                                type="submit"
                            >
                                {t('nav.search')}
                            </button>
                        </li>
                    </form>
                </ul>
            </nav>
        </>
    )
}

export default Nav
