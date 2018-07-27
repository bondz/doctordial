interface User {
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

const users: User[] = [];

export default users;
