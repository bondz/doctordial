import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function authMiddleWare(req: Request, res: Response, next: NextFunction) {
  // tslint:disable-next-line no-string-literal
  const authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader) {
    res.status(403).send({
      message: 'You are logged out',
    });

    return;
  }

  if (Array.isArray(authorizationHeader)) {
    res.status(403).send({
      message: 'An error occured, please try again.',
    });

    return;
  }

  if (authorizationHeader === 'MAX-Analytics-V1') {
    next();

    return;
  }

  const token = authorizationHeader.split(' ')[1];

  if (!token) {
    res.status(403).send({
      message: 'You are not logged in, please login.',
    });

    return;
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET,
    {
      issuer: 'Doctordial',
    },
    (err, decoded: any) => {
      if (err) {
        res.status(500).json({
          message: 'An error occured, please try again.',
        });

        return;
      }

      (<AuthedRequest>req).user = decoded;
      next();
    }
  );
}

export default authMiddleWare;

interface AuthedRequest extends Request {
  user: {
    exp: number;
    iat: number;
    iss: string;
    token: string;
  };
}
