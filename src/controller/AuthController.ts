import { Request, Response } from "express";
import { ResponseUtil } from "../utils/responseHandler";
import { decodeTokenJWT, jwtSign, refreshTokenJWT } from "../helper/jwt";

export const signToken = async(req: Request, res: Response) => {
    try {
        
        const {email, name, user_id, phone } = req.body

        const token = await jwtSign(
            name, 
            email,
            user_id, 
            phone
        );

        if (!token) {
            return ResponseUtil.sendError(res, 'Generate token failed')
        }
        const params = {
            token: token
        }
        return ResponseUtil.sendResponse(res, 'Generate token success', [params])

    } catch (error) {
        console.error(error)
        return ResponseUtil.sendError(res, 'Something went wrong!')
    }
}

export const refreshToken = async(req: Request, res: Response) => {
    try {
        
        const tokenId = req.headers.authorization.split(' ')[1]
        const originalDecode  = await decodeTokenJWT( tokenId ) 
        if ( ! originalDecode ) {
            return ResponseUtil.sendError(res, 'Token not recognized!')
        }

        let expiryTimeToken = originalDecode.payload["exp"] * 1000
        let nowTime = Date.now()
        var diff = ((( nowTime - expiryTimeToken ) / 1000) / 60 ) / 60

        if ( diff > 3 ) {
            return ResponseUtil.sendError(res, 'Token is expired, you need to re-sign token!')
        }

        var dataTokenPayload = originalDecode.payload["data"]
        const refreshToken = await refreshTokenJWT( dataTokenPayload )

        return ResponseUtil.sendResponse(res, 'Generate token success', [{
            token: refreshToken
        }])
    } catch (error) {
        console.error(error)
        return ResponseUtil.sendError(res, 'Something went wrong!')
    }
}