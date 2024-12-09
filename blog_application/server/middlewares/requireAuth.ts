import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import {logger} from "../config/logger";

export interface AuthenticatedRequest extends Request {
  user?: IUser; // Extend the Request interface to include 'auth'
}

/**
 * Middleware that chacks if the user is logged in. Checks if the token is present if not it logs out an error and not let other functions to run if they require authentication
 * @param req The tokan which need to be checked
 * @param res The response that is given if the user is not authenticated
 * @param next Calls the function that requires authentication
 * @returns 
 */
const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, 'MY_SECRET_KEY', async (err: VerifyErrors | null, payload: any) => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.' });
    }

    const { userId } = payload;


    logger.debug(`AuthMiddleware userId=${userId}`)

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).send({ error: 'User not found.' });
      }

      req.user = user; // Assign the auth to the request object
      next(); // Call next to continue to the next middleware or route handler
    } catch (error) {
      return res.status(500).send({ error: 'Internal server error.' });
    }
  });
};

export default authMiddleware;
