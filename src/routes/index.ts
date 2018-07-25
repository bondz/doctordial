import { Router } from 'express';

const router = Router();

router.post('/login', function(req, res, next) {
  res.status(200).send('Login');
});

router.post('/signup', (_req, res) => {
  res.status(200).send('Signup');
});

export default router;
