import {createLogger, transports, format} from "winston";

export const logger = createLogger({

    level: 'debug',
    format: format.json(),
    transports: [
        new transports.Console(),
        /*new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }), Fájlba logolás*/
    ],
});