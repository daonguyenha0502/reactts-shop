import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface TypeTheme {
    theme: 'dark' | 'white'
}

const initialLang: TypeTheme = {
    theme: 'white'
}

const theme = createSlice({
    name: 'themes',
    initialState: initialLang,
    reducers: {
        changeTheme: (state, action: PayloadAction<TypeTheme>) => {
            state.theme = action.payload.theme
        }
    },
})

const { reducer, actions } = theme
export const { changeTheme } = actions
export default theme
