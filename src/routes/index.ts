import { Router } from 'express';

import { signupHandler, loginHandler } from '../controllers/auth';
import logger from '../logger';

const router = Router();

router.post('/login', loginHandler);
router.post('/signup', signupHandler);
router.post('/log', (req, res) => {
  logger.debug(req.body, 'Client logs');

  res.status(200).send('ok');
});

export default router;
