import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { itemType } from 'src/App'

const initialProducts: itemType[] = []

const cart = createSlice({
    name: 'carts',
    initialState: initialProducts,
    reducers: {
        addToCart: (state, action: PayloadAction<itemType>) => {
            // 1. Is the item already added in the cart?
            const isItemInCart = state.find(
                (item: itemType) => item._id === action.payload._id,
            )

            if (isItemInCart) {
                return (state as itemType[]).map((item: itemType) =>
                    item._id === action.payload._id
                        ? { ...item, cartAmount: item.cartAmount + 1 }
                        : item,
                )
            }
            // First time the item is added
            return [...state, { ...action.payload, cartAmount: 1 }]
        },
        reducerCart: (state, action: PayloadAction<itemType>) => {
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
    },
})

const { reducer, actions } = cart
export const { addToCart, reducerCart, deleteFromCart } = actions
export default cart
