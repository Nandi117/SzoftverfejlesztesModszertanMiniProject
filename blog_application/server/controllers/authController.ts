import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Error as MongooseError } from 'mongoose';
import {logger} from "../config/logger"; // Import MongooseError

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

        res.status(201).send({ message:"Sign up was successfull"});
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
            sameSite: 'lax'
        });
        res.status(201).send({ message:"Sign in was successfull!"});
    } catch (err) {
        logger.debug(`Error occured: ${err}`)
        return res.status(422).send({ error: 'Invalid email or password' });
    }
});

export default router;
