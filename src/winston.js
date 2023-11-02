import winston from 'winston';

const levels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
};

const developmentFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.simple()
);

const productionFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
);

let logger;

if (process.env.NODE_ENV !== 'production') {
    logger = winston.createLogger({
        level: 'debug',
        levels,
        format: developmentFormat,
        transports: [new winston.transports.Console()],
    });
} else {
    logger = winston.createLogger({
        level: 'info',
        levels,
        format: productionFormat,
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'errors.log', level: 'error' }),
        ],
    });
}

export default logger;