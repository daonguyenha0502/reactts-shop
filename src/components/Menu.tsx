import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../stores/store'
import { deleteToken } from '../stores/userSlice'
import { toast } from 'react-toastify'

interface Props {
    refSearch: any
    search: string
    handleSubmit: any
    setSearch: any
}

const Menu = ({ refSearch, search, handleSubmit, setSearch }: Props) => {
    const pathName = useLocation()
    const users = useSelector((state: RootState) => state.users)
    const dispatch = useDispatch()
    const handleLogOut = () => {
        dispatch(deleteToken())
        toast.info(`Logout`, {
            position: 'bottom-center',
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
    return (
        <div className="w-4/5 lg:hidden flex-row h-auto bg-gray-500 rounded-b-lg absolute top-12">
            <ul className="mt-2 w-min mx-auto space-x-4 items-center flex sm:flex md:flex lg:hidden">
                <li className="text-white">
                    <input
                        ref={refSearch}
                        className="w-48 sm:w-56 pl-2 focus:outline-none focus:ring rounded text-black text-xl"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </li>
                <li className="h-auto text-white">
                    <button
                        className="bg-green-600 p-1 focus:outline-none active:bg-green-500 rounded px-4 hover:bg-blue-700"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Search
                    </button>
                </li>
            </ul>
            <ul className="mt-2 w-min mx-auto flex-row sm:flex-row md:flex-row lg:hidden">
                {!users.accessToken ? (
                    <>
                        <li className="px-10 bg-blue-500 rounded-sm mb-2 text-black block sm:block md:block lg:hidden">
                            <Link className="cursor-pointer" to="/login">
                                <span
                                    className={
                                        pathName.pathname === '/login'
                                            ? 'text-red-700'
                                            : ''
                                    }
                                >
                                    Login
                                </span>
                            </Link>
                        </li>
                        <li className="px-10 bg-blue-500 rounded-sm mb-2  text-black block sm:block md:block lg:hidden">
                            <Link className="cursor-pointer" to="/register">
                                <span
                                    className={
                                        pathName.pathname === '/register'
                                            ? 'text-red-700'
                                            : ''
                                    }
                                >
                                    Register
                                </span>{' '}
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="px-10 bg-blue-500 rounded-sm mb-2 text-black block sm:block md:block lg:hidden">
                            <Link className="cursor-pointer" to="/profile">
                                <span
                                    className={
                                        pathName.pathname === '/profile'
                                            ? 'text-red-700'
                                            : ''
                                    }
                                >
                                    Profile
                                </span>
                            </Link>
                        </li>
                        <li className="px-10 bg-blue-500 rounded-sm mb-2  text-black block sm:block md:block lg:hidden">
                            <Link
                                className="cursor-pointer"
                                onClick={() => handleLogOut()}
                                to="/logout"
                            >
                                Logout{' '}
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default Menu
