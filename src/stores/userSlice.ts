import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
//import jwt_decode from 'jwt-decode'
import { logOut } from '../api/userApi'
import type { RootState } from './store'
import type { AxiosError } from 'axios'

export interface TypeUser {
    accessToken: string | null
    refreshToken: string | null
}

interface ValidationErrors {
    errorMessage: string
    field_errors: Record<string, string>
}

interface DeleteResponse {
    data: string,
    status: string
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

export const deleteToken = createAsyncThunk('users/deleteToken', async (_, { getState, rejectWithValue }) => {
    try {
        let { users } = await getState() as RootState;
        console.log(users);
        let temp = await { token: users.refreshToken };
        const response: DeleteResponse = await logOut(temp)
        return response.data
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err // cast the error for access
        if (!error.response) {
            throw err
        }
        // We got validation errors, let's return those so we can reference in our component and set form errors
        return rejectWithValue({ status: error.response.status, data: error.response.data })
    }
})

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
            console.log("fulfilled");
            state.accessToken = null
            state.refreshToken = null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }), builder.addCase(deleteToken.rejected, (state, _) => {
            console.log("rejected");
            // state.accessToken = null
            // state.refreshToken = null
            // localStorage.removeItem('accessToken')
            // localStorage.removeItem('refreshToken')
        });
    }
})

const { reducer, actions } = user
export const { saveToken } = actions
export default user