import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartsSlice'

const store = configureStore({
    reducer: {
        carts: cartReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export default store