export interface IUser {
  id: string;
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
    id: '​​​​​109b7b5e-8b79-4d10-95e9-47296023eddd0',
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
    id: '24865076-fc92-4883-b29b-a6054de27b7b',
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
    id: 'f19ea6cb-fc93-4299-a525-e0ca7de5d216',
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
