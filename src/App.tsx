import React, { useEffect, useState, useRef } from 'react';
import './App.css';

import Nav from './components/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Carts from './pages/Carts';
import Toast from './components/Toast';
import { useLocation } from "react-router-dom";
import ProductDetail from './pages/ProductDetail';


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
    const [cartItems, setCartItems] = useState<itemType[] | []>([]);
    const [isOpen, setIsOpen] = useState<boolean | false>(false)
    const [dataToast, setDataToast] = useState<itemType | null>(null)
    const [typeToast, setTypeToast] = useState<"S" | "W">("W")



    const addTask = async ({ search }: string) => {
        console.log(search);
    };

    // const handleAdd = (product: itemType): void => {
    //     setCartItems(prev => {
    //         // 1. Is the item already added in the cart?
    //         const isItemInCart = prev.find((item: itemType) => item._id === product._id);

    //         if (isItemInCart) {
    //             return (prev as itemType[]).map((item: itemType) =>
    //                 item._id === product._id
    //                     ? { ...item, cartAmount: item.cartAmount + 1 }
    //                     : item
    //             );
    //         }
    //         // First time the item is added
    //         return [...prev, { ...product, cartAmount: 1 }];
    //     });
    //     setIsOpen(true)
    //     setDataToast(product)
    //     setTypeToast("S")
    // }
    // const handleReducerCart = (_id: string) => {
    //     setCartItems(prev =>
    //         (prev as itemType[]).reduce((ack: any, item: itemType) => {
    //             if (item._id === _id) {
    //                 if (item.cartAmount === 1) return ack;
    //                 return [...ack, { ...item, cartAmount: item.cartAmount - 1 }];
    //             } else {
    //                 return [...ack, item];
    //             }
    //         }, [] as itemType[])
    //     );
    //     setIsOpen(true)
    //     setDataToast(null)
    //     setTypeToast("W")
    // };

    // const handleRemoveFromCart = (_id: string) => {
    //     setCartItems(prev => {
    //         return prev.filter(product => product._id !== _id)
    //     })
    // }

    return (
        <Router basename="/">
            <div className="App">
                <Nav onSearch={addTask} />
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

                    <Route
                        exact
                        path="*"
                        render={() => <div className="text-5xl mt-52">Page not found</div>}
                    />
                </Switch>
                <Toast isOpen={isOpen} setIsOpen={setIsOpen} dataToast={dataToast} type={typeToast} />
            </div>
        </Router>
    );
}

export default App;
