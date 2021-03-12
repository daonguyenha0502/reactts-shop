import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//import type { itemType } from '../App'

export interface TypeItemCart {
    _id: string
    name: string
    price: number
    sale: number
    img: string
    cartAmount: number | 0
}

const initialProducts: TypeItemCart[] = []

const cart = createSlice({
    name: 'carts',
    initialState: initialProducts,
    reducers: {
        addToCart: (state, action: PayloadAction<TypeItemCart>) => {
            // 1. Is the item already added in the cart?
            const isItemInCart = state.find(
                (item: TypeItemCart) => item._id === action.payload._id,
            )

            if (isItemInCart) {
                return (state as TypeItemCart[]).map((item: TypeItemCart) =>
                    item._id === action.payload._id
                        ? { ...item, cartAmount: item.cartAmount + 1 }
                        : item,
                )
            }
            // First time the item is added
            return [...state, { ...action.payload, cartAmount: 1 }]
        },
        reducerCart: (state, action: PayloadAction<TypeItemCart>) => {
            for (let i = 0; i < state.length; i++) {
                if (
                    state[i]._id === action.payload._id &&
                    state[i].cartAmount === 1
                ) {
                    return state.filter(
                        (product) => product._id !== action.payload._id,
                    )
                } else if (
                    state[i]._id === action.payload._id &&
                    state[i].cartAmount > 1
                ) {
                    // let newState = state.filter((product) => product._id !== action.payload._id)
                    // return [...newState, { ...action.payload, cartAmount: action.payload.cartAmount - 1 }]
                    let a: any = state.find(
                        (product) => product._id === action.payload._id,
                    )
                    a.cartAmount = a.cartAmount - 1
                }
            }
        },
        deleteFromCart: (state, action: PayloadAction<any>) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i]._id === action.payload._id) {
                    return state.filter(
                        (product) => product._id !== action.payload._id,
                    )
                }
            }
        },
        freeCart: (state) => {
            state.length = 0
        },
    },
})

const { reducer, actions } = cart
export const { addToCart, reducerCart, deleteFromCart, freeCart } = actions
export default cart
