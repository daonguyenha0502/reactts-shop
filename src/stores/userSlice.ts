import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//import jwt_decode from 'jwt-decode'
//import userApi from '../api/userApi'

export interface TypeUser {
    accessToken: string | null
    refreshToken: string | null
}
let initialUser: TypeUser = { accessToken: null, refreshToken: null }
if (
    localStorage.getItem('accessToken') &&
    localStorage.getItem('refreshToken')
) {
    initialUser = {
        accessToken: localStorage.getItem('accessToken') as string,
        refreshToken: localStorage.getItem('refreshToken') as string,
    }
}

const user = createSlice({
    name: 'users',
    initialState: initialUser,
    reducers: {
        saveToken: (state, action: PayloadAction<TypeUser>) => {
            //console.log(action.payload)
            if (action.payload.refreshToken && action.payload.accessToken) {
                state.accessToken = action.payload.accessToken
                state.refreshToken = action.payload.refreshToken
                localStorage.setItem('accessToken', action.payload.accessToken)
                localStorage.setItem(
                    'refreshToken',
                    action.payload.refreshToken,
                )
            }
        },
        deleteToken: (state) => {
            // if(state.refreshToken && state.accessToken){
            //     const res = userApi.logOut(state.refreshToken)
            // }
            state.accessToken = null
            state.refreshToken = null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        },
    },
})

const { reducer, actions } = user
export const { saveToken, deleteToken } = actions
export default user
