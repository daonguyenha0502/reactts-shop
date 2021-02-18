import React, { useEffect, useState, useRef } from 'react';
import './App.css';

import Nav from './components/Nav';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Carts from './pages/Carts';
import { useLocation } from "react-router-dom";
import ProductDetail from './pages/ProductDetail';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import PageSearch from './pages/PageSearch';


export function ScrollToTop(): any {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return null;
}


interface AppProps { }

export interface itemType {
    _id: string;
    type?: string;
    name: string;
    company: string;
    price: number;
    sale: number;
    sold: number;
    state?: boolean
    published: string
    img: string;
    idDetailProduct: string
    amount: number;
    cartAmount: number | 0;
}

let pictures: string[] = ["https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588517602/shop/other/sl3_j9d1sa.png", "https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588517607/shop/other/sl2_w0zrzi.png", "https://res.cloudinary.com/daoha0502/image/upload/q_auto/v1588517613/shop/other/sl1_hotjpl.png"]

function App({ }: AppProps) {

    return (
        <Router basename="/">
            <div className="App">
                <Nav />
                <Switch>
                    <Route exact path="/">
                        <Index
                            listPictures={pictures}
                        />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/register">
                        <Register />
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

                    <Route
                        exact
                        path="*"
                        render={() => <div className="text-5xl mt-52">Page not found</div>}
                    />
                </Switch>
                {/* <Toast stateToast={state} onClose={handleCloseToast} /> */}
                <ToastContainer
                    style={{ width: "20rem" }}
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
            </div>
        </Router>
    );
}

export default App;
