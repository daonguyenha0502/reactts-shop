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
            //console.log(error)
            let baseURL = import.meta.env.SNOWPACK_PUBLIC_APP_URL
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            window.location.replace(`${baseURL}/login`)
        })
}

export const UploadImg = async (file: File) => {
    try {
        const cloudName = await import.meta.env.SNOWPACK_PUBLIC_CLOUD_NAME
        const preset = await import.meta.env.SNOWPACK_PUBLIC_PRESET_NAME
        const bodyFormData = new FormData
        bodyFormData.append('upload_preset', preset)
        bodyFormData.append('file', file)
        const response = await axios({
            method: 'post',
            url: `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
            data: bodyFormData,
        })
        return { url: response.data.url }
    } catch (error) {
        console.log(error)
        return { error: error }
    }


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

export interface TypeResponse {
    data: any,
    status: number
}

axiosClient.interceptors.response.use(
    (response: any) => {
        if (response && response.data) {
            //console.log(response)
            return { status: response.status, data: response.data }
        }
        return response
    },
    (error: any) => {
        return Promise.reject({ status: error.response.status, error: error.response.data });
    },
)

export default axiosClient
