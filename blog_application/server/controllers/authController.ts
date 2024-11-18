import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Error as MongooseError } from 'mongoose';
import {logger} from "../config/logger"; // Import MongooseError
import authMiddleware, {AuthenticatedRequest} from "../middlewares/requireAuth";

const router = express.Router();

// User signup
router.post('/signup', async (req, res) => {
    const { email, password, username } = req.body;

    logger.debug(`User sign up with in API layer: username=${username}, email=${email}, password=${password}`);
    try {
        const password_hash = await bcrypt.hash(password, 10);
        const user = new User({ email, password_hash, username });
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');

        res.cookie("AUTH_TOKEN", token, {
            httpOnly: false,
            maxAge: 60 * 60 * 1000,
            sameSite: 'lax'
        });

        res.status(201).send({username:user.username, email:user.email});
    } catch (err) {
        // Cast `err` to `any` to access `code`
        console.error(err); // Log the error for debugging
        if (err instanceof MongooseError && (err as any).code === 11000) {
            return res.status(422).send({ error: 'Email or username is already in use' });
        }
        return res.status(422).send({ error: 'An error occurred' });
    }
});

// User signin
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide email and password' });
    }

    const user = await User.findOne({ email });

    logger.debug(`User to log in: username=${user.username}, email=${user.email}`);
    if (!user) {
        return res.status(422).send({ error: 'Invalid email or password' });
    }

    try {
        logger.debug("User is exist!");
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(422).send({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');

        logger.debug(`Auth token=${token}`);

        res.cookie("AUTH_TOKEN", token, {
            httpOnly: false,
            maxAge: 60 * 60 * 1000,
            sameSite: 'lax',
        });

        res.status(201).send({username:user.username, email:user.email});
    } catch (err) {
        logger.debug(`Error occured: ${err}`)
        return res.status(422).send({ error: 'Invalid email or password' });
    }
    router.post('/change-password', authMiddleware, async (req: AuthenticatedRequest, res) => {
        const { currentPassword, newPassword } = req.body;
      
        if (!currentPassword || !newPassword) {
          return res.status(400).send({ error: 'Current and new passwords are required' });
        }
      
        try {
          const user = req.user; // Use the extended property
      
          if (!user) {
            return res.status(401).send({ error: 'Unauthorized access' });
          }
      
          const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
          if (!isMatch) {
            return res.status(401).send({ error: 'Current password is incorrect' });
          }
      
          const password_hash = await bcrypt.hash(newPassword, 10);
          user.password_hash = password_hash;
      
          await user.save();
      
          logger.info(`Password changed for user ${user.email}`);
          res.status(200).send({ message: 'Password changed successfully.' });
        } catch (err) {
          logger.error(`Error during password change: ${err}`);
          res.status(500).send({ error: 'Internal server error.' });
        }
      });
});

export default router;
