



import {NextFunction, Response, Request} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";


interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

export const authenticateToken = (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

    const authHeader:any = req.headers["Authorization"]
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'Missing token' });
    }

    jwt.verify(token, "'MY_SECRET_KEY'", (err:any, user:any) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};