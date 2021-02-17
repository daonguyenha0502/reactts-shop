import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { itemType } from '../App'

export interface typeToast {
    state: boolean
    data: itemType | null
    type: "S" | "W"
}

const initialToast: typeToast = {
    state: false,
    data: null,
    type: "S"
};

const toast = createSlice({
    name: 'toasts',
    initialState: initialToast,
    reducers: {
        setStateToast: (state, action: PayloadAction<typeToast>) => {
            state.state = action.payload.state
            state.data = action.payload.data
            state.type = action.payload.type
        }
    }


});

const { reducer, actions } = toast;
export const { setStateToast } = actions;
export default toast;