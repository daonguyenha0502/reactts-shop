import React, { useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';

import Cart from './Cart';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import type { itemType } from 'src/App';
import { faReact } from '@fortawesome/free-brands-svg-icons';

interface Props {
  onSearch: any;
  cartItems: itemType[];
}

const Nav = ({ onSearch, cartItems }: Props) => {
  const [search, setSearch] = useState('');
  const [isOpenMenu, setIsOpenMenu] = useState<boolean | false>(false);

  const refSearch = useRef<HTMLInputElement | null>(null);

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (refSearch.current) {
      if (!search) {
        refSearch.current.focus();
      } else {
        onSearch({ search });
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
              <Cart cartItems={cartItems} /> Cart
            </Link>
          </li>
          <li className="w-36 text-white hidden sm:hidden md:hidden lg:block">
            <Link to="/login">Login</Link>
          </li>
          <li className="w-36 text-white hidden sm:hidden md:hidden lg:block">
            <Link to="/register">Register</Link>
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
              onClick={onSubmit}
            >
              Search
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
