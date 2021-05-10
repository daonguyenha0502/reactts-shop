import React, { useEffect, useState, lazy, Suspense } from 'react'
import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import clsx from 'clsx'

import Loading from './components/Skeleton/Loading'
const Nav = lazy(() => import('./components/Nav/Nav'))
const Index = lazy(() => import('./pages/Index'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Carts = lazy(() => import('./pages/Carts'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const PageSearch = lazy(() => import('./pages/PageSearch'))
const PageTypeProducts = lazy(() => import('./pages/PageTypeProducts'))
const CheckOut = lazy(() => import('./pages/CheckOut'))
const Blog = lazy(() => import('./pages/Blog'))
const AddContentBlog = lazy(() => import('./pages/DashBoard/AddContentBlog'))
const Profile = lazy(() => import('./pages/Profile'))
const ChangePassword = lazy(() => import('./pages/ChangePassword'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const RestorePassword = lazy(() => import('./pages/RestorePassword'))
const UploadImage = lazy(() => import('./pages/DashBoard/UploadImage'))
const AddCarousel = lazy(() => import('./pages/DashBoard/AddCarousel'))

import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareUp } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from './stores/store'
import { changeTheme } from './stores/themeSlice'

//import TestCheckOut from './pages/TestCheckOut';

export function ScrollToTop(): any {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return null
}

interface AppProps {}

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

function App({}: AppProps) {
    const themes = useSelector((state: RootState) => state.themes)
    const dispatch = useDispatch()
    const action = changeTheme()

    function setTheme() {
        if (themes.theme === 'light') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }
    function changeThemes() {
        dispatch(action)
    }
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
    useEffect(() => {
        setTheme()
    }, [themes.theme])

    return (
        <Router basename="/">
            <div className="App dark:bg-gray-800">
                <Suspense fallback={<Loading />}>
                    <Nav changeTheme={changeThemes} theme={themes} />
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
                                <div className="text-5xl mt-52">
                                    Page not found
                                </div>
                            )}
                        />
                    </Switch>
                </Suspense>
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
                            : 'animate-bounce dark:text-gray-200 text-gray-800 fixed bottom-20 right-8 sm:right-2 xl:right-12 cursor-pointer',
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
