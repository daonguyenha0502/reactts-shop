import React, { useEffect, useState } from 'react';
import './App.css';

import Nav from './components/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Carts from './pages/Carts';
import { useLocation } from "react-router-dom";


export function ScrollToTop(): any {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return null;
}


interface AppProps { }

export interface itemType {
    id: string;
    image: string;
    title: string;
    price: number;
    amount: number | 0;
}

function App({ }: AppProps) {
    const [cartItems, setCartItems] = useState<itemType[] | []>([]);
    const [listProduct, setListProduct] = useState<itemType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const getAllProduct = async () => {
            const res: any = await fetch('https://fakestoreapi.com/products');
            const list = await res.json();
            setListProduct(list);
            await setIsLoading(true);
        };
        getAllProduct();
    }, []);


    const addTask = async ({ search }: string) => {
        console.log(search);
    };

    const handleAdd = (product: itemType): void => {
        setCartItems(prev => {
            // 1. Is the item already added in the cart?
            const isItemInCart = prev.find((item: itemType) => item.id === product.id);

            if (isItemInCart) {
                return (prev as itemType[]).map((item: itemType) =>
                    item.id === product.id
                        ? { ...item, amount: item.amount + 1 }
                        : item
                );
            }
            // First time the item is added
            return [...prev, { ...product, amount: 1 }];
        });
    }
    const handleReducerCart = (id: string) => {
        setCartItems(prev =>
            (prev as itemType[]).reduce((ack: any, item: itemType) => {
                if (item.id === id) {
                    if (item.amount === 1) return ack;
                    return [...ack, { ...item, amount: item.amount - 1 }];
                } else {
                    return [...ack, item];
                }
            }, [] as itemType[])
        );
    };

    return (
        <Router basename="/">
            <div className="App">
                <Nav onSearch={addTask} cartItems={cartItems} />
                <Switch>
                    <Route exact path="/">
                        <Index
                            onAdd={handleAdd}
                            listProduct={listProduct}
                            isLoading={isLoading}
                        />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <Route exact path="/cart">
                        <Carts cartItems={cartItems} onAdd={handleAdd} onReducer={handleReducerCart} />
                    </Route>

                    <Route
                        exact
                        path="*"
                        render={() => <div className="text-5xl mt-52">Page not found</div>}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
