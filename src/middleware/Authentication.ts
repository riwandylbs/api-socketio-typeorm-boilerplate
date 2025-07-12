import { verify } from "crypto";
import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "../helper/jwt";
import { API_KEY } from "../config";

export const authentication = async (req: Request, res: Response, next: NextFunction) => {

    // Exclude this endpoint authenticate by middleware
    const nonSecureEndpoint = ['/'];
    if (nonSecureEndpoint.includes(req.path)) return next()

    let regexPublicImg = /videos/
    if ( regexPublicImg.test(req.path) ) return next()

    // Check the request has an mandatory api-key
    if(!req.header("API-KEY")) {
        return res.status(400)
            .json({code: 400, success: false, error: "Invalid client", data: []});
    }
    
    // Authenticate the api-key
    let apiKey = req.header("API-KEY")
    if (apiKey != API_KEY) {
        return res.status(400)
            .json({code: 400, success: false, error: "Invalid client", data:[] });
    }
    
    const nonSecureEndPointWithJWT = ['/auth/sign', '/auth/refresh/token'];

    if (nonSecureEndPointWithJWT.includes(req.path)) return next()

    // Authenticate JWT value
    if (!req.headers.authorization) {
        return res.status(400)
            .json({code: 400, success: false, error: "Invalid header authentication", data:[] });
    }

    const auth_header = req.headers.authorization
    if (!auth_header || auth_header === "Basic Og==") {
        return res.status(400)
            .json({code: 400, success: false, error: "Invalid header authentication", data:[] });
    }

    let bearer = auth_header.split(' ')[1]
    if ( bearer == undefined) {
        return res.status(400)
            .json({code: 400, success: false, error: "Invalid header authentication", data:[] });
    }

    // check expiry session
    try {
        const verifyToken = await jwtVerify(bearer)
    } catch (error) {
        return res.status(401)
            .json({code: 401, success: false, error: [{
                msg: "Your session was expired!"
            }], data:[] });
    }

    next()
}