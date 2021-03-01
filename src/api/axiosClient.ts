import axios from 'axios'
import queryString from 'query-string'
import jwt_decode from 'jwt-decode'

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
    baseURL: import.meta.env.SNOWPACK_PUBLIC_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
})

const getToken = (token: string) => {
    axios
        .post('https://gearshop.glitch.me/api/getToken', {
            token: token,
        })
        .then(function (response: any) {
            //console.log(response.data);
            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken)
            }
        })
        .catch(function (error) {
            console.log(error)
        })
}

const myInterceptor = axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    const accessToken = await localStorage.getItem('accessToken')
    const refreshToken = await localStorage.getItem('refreshToken')
    if (accessToken) {
        const token = accessToken
        const decodeAccessToken: any = await jwt_decode(token)
        //console.log(decodeAccessToken)
        if (decodeAccessToken.exp < Date.now() / 1000) {
            //axios.interceptors.request.eject(myInterceptor);
            console.log('Token expire')
            if (refreshToken) {
                getToken(refreshToken)
            }
        } else {
            config.headers.Authorization = `Bearer ${token}`
        }
    }

    return config
})

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            //console.log(response)
            return response.data
        }

        return response
    },
    (error) => {
        // Handle errors
        throw error
    },
)

export { myInterceptor }
export default axiosClient
