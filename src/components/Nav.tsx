import React, { useEffect, useRef, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import LinkItemCart from './LinkItemCart';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import type { itemType } from 'src/App';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../app/store';

interface Props {

}


const Nav = ({ }: Props) => {
    const [search, setSearch] = useState('');
    const [isOpenMenu, setIsOpenMenu] = useState<boolean | false>(false);
    const carts = useSelector((state: RootState) => state.carts);

    const pathName = useLocation();
    const refSearch = useRef<HTMLInputElement | null>(null);
    let history = useHistory()
    const handleSearch = async (search: string) => {
        //console.log(search);
        history.push(`/search?q=${search}`);
    };

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (refSearch.current) {
            if (!search) {
                refSearch.current.focus();
            } else {
                handleSearch(search);
                setSearch('');
            }
        }
    };

    return (
        <>
            <nav className="lg:flex w-full h-12 bg-gray-800 fixed top-0 z-50">
                <ul className="h-12 lg:w-1/2 sm:w-full w-full justify-center flex space-x-4 items-center">
                    <li className="w-36 h-auto text-white">
                        <Link to="/">
                            <FontAwesomeIcon icon={faReact} size="2x" />
                        </Link>
                    </li>
                    <li className="w-36 text-white">
                        <Link to="/cart">
                            <LinkItemCart cartItems={carts} /> <span className={pathName.pathname === '/cart' ? "border-gray-200 border-b-2" : ""}>Cart</span>
                        </Link>
                    </li>
                    <li className="w-36 text-white hidden sm:hidden md:hidden lg:block">
                        <Link to="/login"><span className={pathName.pathname === '/login' ? "border-gray-200 border-b-2" : ""}>Login</span></Link>
                    </li>
                    <li className="w-36 text-white hidden sm:hidden md:hidden lg:block">
                        <Link to="/register"><span className={pathName.pathname === '/register' ? "border-gray-200 border-b-2" : ""}>Register</span></Link>
                    </li>
                    <li
                        className="w-36 block sm:block md:block lg:hidden cursor-pointer"
                        onClick={() => setIsOpenMenu(!isOpenMenu)}
                    >
                        <FontAwesomeIcon icon={faBars} size="2x" color="white" />
                    </li>
                    {isOpenMenu && (
                        <Menu
                            refSearch={refSearch}
                            search={search}
                            handleSubmit={onSubmit}
                            setSearch={setSearch}
                        />
                    )}
                </ul>
                <ul className="w-1/2 justify-end space-x-4 items-center mr-4 hidden sm:hidden md:hidden lg:flex">
                    <form className="flex justify-end space-x-4 items-center" onSubmit={onSubmit}>
                        <li className="text-white">
                            <input
                                ref={refSearch}
                                className="w-56 pl-2 focus:outline-none focus:ring rounded text-black text-xl"
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </li>
                        <li className="h-auto text-white">
                            <button
                                className="bg-green-600 p-1 focus:outline-none active:bg-green-500 rounded px-4 hover:bg-blue-700"
                                type="submit"

                            >
                                Search
            </button>
                        </li>
                    </form>
                </ul>
            </nav>
        </>
    );
};

export default Nav;
