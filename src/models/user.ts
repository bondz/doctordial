export interface IUser {
  firstName: string;
  lastName: string;
  isDoctor: boolean;
  isPatient: boolean;
  accountVerified: boolean;
  isVerifiedDoctor: boolean;
  email: string;
  phone: string;
  password: string;
}

const users: IUser[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    isDoctor: true,
    isPatient: false,
    accountVerified: true,
    isVerifiedDoctor: true,
    email: 'john@example.com',
    phone: '+17032455890',
    password: 'an-encrypted-string',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    isDoctor: false,
    isPatient: true,
    accountVerified: true,
    isVerifiedDoctor: false,
    email: 'doe@example.com',
    phone: '+2348054231245',
    password: 'a-different-encrypted-string',
  },
  {
    firstName: 'Maddie',
    lastName: 'McAvoy',
    isDoctor: true,
    isPatient: false,
    accountVerified: true,
    isVerifiedDoctor: true,
    email: 'maddie@example.gov',
    phone: '+19012339402',
    password: '-no-phrase(word)-is-safe!',
  },
];

export default users;
