import jwt_decode from 'jwt-decode'

async function decodeJwt(token: any) {
    const jwt: any = await jwt_decode(token)
    if (jwt) {
        return jwt.accessToken
    }
    return false
}
function getRoleInToken(token: string | null) {
    if (token) {
        const jwt: any = jwt_decode(token)
        if (jwt) {
            //console.log(jwt.role)
            return jwt.role.toString()
        }
    } else {
        return 'user'
    }
}

export { getRoleInToken, decodeJwt }
