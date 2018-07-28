import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectTypeConfig,
} from 'graphql';
import { IUser } from '../models/user';

const UserType = new GraphQLObjectType(<GraphQLObjectTypeConfig<IUser, any>>{
  name: 'UserType',
  description:
    'Describes a user (patient or doctor) who signs up using the doctordial service',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'The ID of this user',
    },
    firstName: {
      type: GraphQLString,
      description: 'The first name of the user',
    },
    lastName: {
      type: GraphQLString,
      description: 'The last name of the user',
    },
    isPatient: {
      type: GraphQLBoolean,
      description: 'Specifies if the user has a patient account',
    },
    isDoctor: {
      type: GraphQLBoolean,
      description: 'Specifies if the user has a doctor accoutn',
    },
    accountVerified: {
      type: GraphQLBoolean,
      description: 'Specifies if the user account has been verified',
    },
    isVerifiedDoctor: {
      type: GraphQLBoolean,
      description: 'Specifies if the doctor account has been verified',
    },
  }),
});

export default UserType;
