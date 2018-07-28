import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectTypeConfig,
} from 'graphql';

import UserType from './user';
import User from '../models/user';
import { IQuestion, IAnswer } from '../models/questions-bank';

const QuestionType = new GraphQLObjectType(<
  GraphQLObjectTypeConfig<IQuestion, any>
>{
  name: 'QuestionType',
  description: 'Describes a question asked in the doctordial service',
  fields: () => ({
    id: {
      type: GraphQLString,
      description:
        'The ID of the question, can be used to fetch the question for other actions',
    },
    text: {
      type: GraphQLString,
      description: 'The content of the question',
    },
    author: {
      type: UserType,
      description: 'The user who created the question',
      resolve: question => User.find(u => u.id === question.author),
    },
    answers: {
      type: new GraphQLList(AnswerType),
      description: 'The answers provided for this question',
    },
  }),
});

const AnswerType = new GraphQLObjectType(<
  GraphQLObjectTypeConfig<IAnswer, any>
>{
  name: 'AnswerType',
  description: 'Describes the answer to a question in the doctordial service',
  fields: () => ({
    author: {
      type: UserType,
      description: 'The user who created this answer',
      resolve: answer => User.find(u => u.id === answer.author),
    },
    text: {
      type: GraphQLString,
      description: 'The answer to the question',
    },
    upvotes: {
      type: GraphQLInt,
      description: 'The number of upvotes this question has',
    },
    downvotes: {
      type: GraphQLInt,
      description: 'The number of downvotes this question has',
    },
  }),
});

export default QuestionType;
