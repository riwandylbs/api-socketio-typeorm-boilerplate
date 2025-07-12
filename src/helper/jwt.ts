import { jwtSecret } from "../config"
import { jwtExpiry } from "../config"

var jwt = require('jsonwebtoken')

export const jwtSign =async (name:string, email: string, user_id: number, phone: string) => {
    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * jwtExpiry),
        data: {
            name: name, 
            user_id: user_id, 
            email: email,
            phone: phone
        }
      }, jwtSecret);

    return token
}

export const jwtVerify =async (token: string) => {
    let decodeToken = jwt.verify(token, jwtSecret)
    return decodeToken;
}

export const decodeTokenJWT =async (token: string) => {
    let originalDecoded = jwt.decode(token, {complete: true});
    return originalDecoded;
}

export const refreshTokenJWT =async (dataTokenPayload: string) => {
    var refreshed = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * jwtExpiry),
        data: dataTokenPayload
      }, jwtSecret);
    return refreshed;
}