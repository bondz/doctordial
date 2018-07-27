import { Router } from 'express';

import { signupHandler, loginHandler } from '../controllers/auth';

const router = Router();

router.post('/login', loginHandler);
router.post('/signup', signupHandler);

export default router;
