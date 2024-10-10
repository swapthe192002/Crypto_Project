import { Router } from 'express';

import getStats from './api/router/stats.router';
import getDeviation from './api/router/deviation.router';

const router = Router();

const coinRoute = '/coin';

router.use(coinRoute, getStats);
router.use(coinRoute, getDeviation);

export default router;
