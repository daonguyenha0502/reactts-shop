import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
//import jwt_decode from 'jwt-decode'
import { logOut } from '../api/userApi'
import type { RootState } from './store'

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

export const deleteToken = createAsyncThunk("users/deleteToken", async (_, { getState, rejectWithValue }) => {
    let { users } = getState() as RootState;
    console.log(users);
    let temp = { token: users.refreshToken };
    const res = logOut(temp);
    console.log(res);
    if (res === undefined) {
        console.log("d");
        return rejectWithValue('error');
    }
});

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
        // deleteToken: (state) => {
        //     if (state.refreshToken && state.accessToken) {
        //         let temp = { token: state.refreshToken }
        //         const res = logOut(temp)
        //         //console.log(temp)
        //         state.accessToken = null
        //         state.refreshToken = null
        //         localStorage.removeItem('accessToken')
        //         localStorage.removeItem('refreshToken')
        //     }
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteToken.fulfilled, (state, _) => {
            console.log("a");
        }), builder.addCase(deleteToken.rejected, (state, _) => {
            console.log("error");
        });
    }
})

const { reducer, actions } = user
export const { saveToken } = actions
export default user