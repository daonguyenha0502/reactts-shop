import jwt_decode from 'jwt-decode'

async function decodeJwt(token: any){
    const jwt:any =await jwt_decode(token)
    if(jwt){
        return jwt.accessToken
    }
    return false
}
async function getRoleInToken(token: any) {
    const jwt:any = await jwt_decode(token)
    if(jwt.accessToken){
        return jwt.accessToken.role 
    }else{
        return 'user'
    }
}

export { getRoleInToken, decodeJwt }