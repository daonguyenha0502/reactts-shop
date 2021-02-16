import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { itemType } from 'src/App';

const initialPhotos: itemType[] = [];

const cart = createSlice({
    name: 'carts',
    initialState: initialPhotos,
    reducers: {
        addToCart: (state, action: PayloadAction<itemType>) => {
            // 1. Is the item already added in the cart?
            const isItemInCart = state.find((item: itemType) => item._id === action.payload._id);

            if (isItemInCart) {
                return (state as itemType[]).map((item: itemType) =>
                    item._id === action.payload._id
                        ? { ...item, cartAmount: item.cartAmount + 1 }
                        : item
                );
            }
            // First time the item is added
            return [...state, { ...action.payload, cartAmount: 1 }];
        }
    }
});

const { reducer, actions } = cart;
//export const  = actions;
export default reducer;