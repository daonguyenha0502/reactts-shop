import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface TypeTheme {
    theme: 'dark' | 'light'
}

const initialLang: TypeTheme = {
    theme: 'light'
}

const theme = createSlice({
    name: 'themes',
    initialState: initialLang,
    reducers: {
        changeTheme: (state) => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark'
        }
    },
})

const { reducer, actions } = theme
export const { changeTheme } = actions
export default theme
