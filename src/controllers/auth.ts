import express from 'express';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import { v4 } from 'uuid';

import logger from '../logger';
import User from '../models/user';

const jwtSignAsync = promisify<
  string | object | Buffer,
  jwt.Secret,
  jwt.SignOptions | undefined,
  string
>(jwt.sign);

export async function loginHandler(
  req: express.Request,
  res: express.Response
) {
  const { email, password }: { email: string; password: string } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Enter an email address and password' });

    return;
  }

  const user = User.find(u => u.email === email);

  if (!user) {
    res.status(400).json({ message: 'Invalid credentials' });

    return;
  }

  const validPassword = comparePassword(user, password);

  if (!validPassword) {
    res.status(400).json({ message: 'Invalid credentials' });

    return;
  }

  try {
    const token = await generateToken(user);

    res.status(200).json({
      token,
      message: 'Login successful',
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'A server error occured. Please try again later' });

    logger.error(
      { err },
      'Could not create jwt token. Check that JWT_SECRET is set'
    );
  }
}

export async function signupHandler(
  req: express.Request,
  res: express.Response
) {
  const body = req.body;

  const { error, value: request } = validateSignupRequest(body);

  if (error) {
    res.status(400).json({
      message: error,
    });

    return;
  }

  const { password, confirmPassword, ...rest } = request;

  if (password !== confirmPassword) {
    res.status(400).json({
      message: 'Password and confirmation do not match',
    });

    return;
  }

  const existing = User.find(u => u.email === request.email);

  if (existing) {
    res.status(400).json({
      message: 'Please login instead',
    });

    return;
  }

  const encPassword = encryptPassword(password);
  const isDoctor = request.isDoctor;
  const isPatient = !request.isDoctor;

  const newUser = {
    id: v4(),
    ...rest,
    accountVerified: false,
    isDoctor,
    isPatient,
    isVerifiedDoctor: false,
    password: encPassword,
  };

  User.push(newUser);

  const token = await generateToken(newUser);

  res.status(200).json({
    token,
    message: 'Signup successful.',
  });

  // In a real app, you would trigger a worker to confirm the email address.
}

function encryptPassword(password: string) {
  /**
   * In a production application, you would hash this in a worker thread or external service
   * using bcrypt, scrypt, or PBKDF2.
   *
   * Here, we just return the string in cleartext.
   */

  return password;
}

function comparePassword(
  user: { password: string },
  password: string
): boolean {
  /**
   * In a production application, you'd want to compare the strings using a constant
   * time function to avoid timing attacks.
   */

  return user.password === encryptPassword(password);
}

async function generateToken(user: any): Promise<string> {
  // Make sure we don't accidentally add the user password to the tokenized string.
  const { password, confirmPassword, ...rest } = user;

  return jwtSignAsync(rest, process.env.JWT_SECRET, {
    expiresIn: '1d',
    issuer: 'Doctordial',
  });
}

function validateSignupRequest(body: any) {
  const schema = {
    firstName: joi
      .string()
      .trim()
      .min(3)
      .required(),
    lastName: joi
      .string()
      .trim()
      .min(3)
      .required(),
    email: joi
      .string()
      .trim()
      .email()
      .lowercase()
      .required(),
    phone: joi
      .string()
      .min(10)
      .required(),
    password: joi
      .string()
      .min(8)
      .required(),
    confirmPassword: joi
      .string()
      .min(8)
      .required(),
    isDoctor: joi
      .boolean()
      .truthy(1)
      .falsy(0)
      .default(false),
  };

  return joi.validate<SignupRequest>(body, schema, {
    abortEarly: false,
    skipFunctions: true,
    allowUnknown: false,
  });
}

interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  isDoctor: boolean;
}
