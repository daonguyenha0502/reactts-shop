import React, { useEffect, useState } from 'react'
import './App.css'

import Nav from './components/Nav/Nav'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import clsx from 'clsx'
import Index from './pages/Index'
import Login from './pages/Login'
import Register from './pages/Register'
import Carts from './pages/Carts'
import { useLocation } from 'react-router-dom'
import ProductDetail from './pages/ProductDetail'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import PageSearch from './pages/PageSearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareUp } from '@fortawesome/free-solid-svg-icons'
import PageTypeProducts from './pages/PageTypeProducts'
import CheckOut from './pages/CheckOut'
import Blog from './pages/Blog'
import AddContentBlog from './pages/DashBoard/AddContentBlog'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'
import ForgotPassword from './pages/ForgotPassword'
import RestorePassword from './pages/RestorePassword'
import UploadImage from './pages/DashBoard/UploadImage'
import AddCarousel from './pages/DashBoard/AddCarousel'
//import TestCheckOut from './pages/TestCheckOut';

export function ScrollToTop(): any {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return null
}

interface AppProps { }

export interface itemType {
    _id: string
    type?: string
    name: string
    company: string
    price: number
    sale: number
    sold: number
    state?: boolean
    published: string
    img: string
    idDetailProduct: string
    amount: number
    cartAmount: number | 0
}


function App({ }: AppProps) {
    const [hiddenScroll, setHiddenScroll] = useState<boolean | true>(true)
    function handleUpTop() {
        window.scroll(0, 0)
    }
    const heightScreen = window.innerHeight
    function handleGetPositionScroll() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > heightScreen) {
                setHiddenScroll(false)
            } else {
                setHiddenScroll(true)
            }
        })
    }
    useEffect(() => {
        //bug
        handleGetPositionScroll()
    }, [])

    return (
        <Router basename="/">
            <div className="App">
                <Nav />
                <Switch>
                    <Route exact path="/">
                        <Index />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <Route exact path="/changePassword">
                        <ChangePassword />
                    </Route>
                    <Route exact path="/forgotPassword">
                        <ForgotPassword />
                    </Route>
                    <Route exact path="/restorePassword">
                        <RestorePassword />
                    </Route>
                    <Route exact path="/cart">
                        <Carts />
                    </Route>
                    <Route exact path="/products/:id">
                        <ProductDetail />
                    </Route>
                    <Route exact path="/search">
                        <PageSearch />
                    </Route>
                    <Route exact path="/products">
                        <PageTypeProducts />
                    </Route>
                    <Route exact path="/checkout">
                        <CheckOut />
                    </Route>
                    <Route exact path="/admin/addBlog">
                        <AddContentBlog />
                    </Route>
                    <Route exact path="/admin/addCarousel">
                        <AddCarousel />
                    </Route>

                    <Route exact path="/blog/:idBlog">
                        <Blog />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                    <Route exact path="/admin/uploadImage">
                        <UploadImage />
                    </Route>

                    <Route
                        exact
                        path="*"
                        render={() => (
                            <div className="text-5xl mt-52">Page not found</div>
                        )}
                    />
                </Switch>
                <ToastContainer
                    style={{ width: '20rem' }}
                    position="bottom-center"
                    autoClose={4000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    limit={4}
                />
                <div
                    onClick={() => handleUpTop()}
                    className={clsx(
                        hiddenScroll
                            ? 'fixed bottom-20 right-8 sm:right-2 xl:right-12 cursor-pointer hidden'
                            : 'animate-bounce fixed bottom-20 right-8 sm:right-2 xl:right-12 cursor-pointer',
                    )}
                    title="Scroll Back to Top"
                >
                    <FontAwesomeIcon icon={faCaretSquareUp} size="2x" />
                </div>
            </div>
        </Router>
    )
}

export default App
