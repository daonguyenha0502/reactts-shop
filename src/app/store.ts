import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartReducer from './cartsSlice'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['toasts']

}

const rootReducer = combineReducers({ carts: cartReducer.reducer })


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})
export type RootState = ReturnType<typeof store.getState>
export default store