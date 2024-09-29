import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Error as MongooseError } from 'mongoose'; // Import MongooseError

const router = express.Router();

// User signup
router.post('/signup', async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const password_hash = await bcrypt.hash(password, 10);
        const user = new User({ email, password_hash, username });
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.status(201).send({ token });
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
    if (!user) {
        return res.status(422).send({ error: 'Invalid email or password' });
    }

    try {
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(422).send({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token });
    } catch (err) {
        return res.status(422).send({ error: 'Invalid email or password' });
    }
});

export default router;
