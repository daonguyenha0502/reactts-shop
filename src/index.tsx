import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { PersistGate } from 'redux-persist/integration/react'
import store from './stores/store'
import { persistStore } from 'redux-persist'
import { init_i18n } from './i18n'

import './index.css'

let persistor = persistStore(store)
init_i18n();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
    import.meta.hot.accept()
}
