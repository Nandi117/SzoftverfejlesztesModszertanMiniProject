import {logger} from "../config/logger";
import User from "../models/user";


export const userService  = {


    findAccounts:async () =>{

        logger.debug("Get accounts in the BLl layer");

        const accounts = await User.find();

        return accounts;

    }
}