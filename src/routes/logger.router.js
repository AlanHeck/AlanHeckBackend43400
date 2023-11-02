import { Router } from 'express';
import logger from '../winston.js';

const router = Router();

router.get('/', (req, res) => {
    logger.debug('Debug log');
    logger.info('Info log');
    logger.warn('Warning log');
    logger.error('Error log');
    logger.fatal('Fatal log');

    res.send('Logger test completed');
});

export default router;