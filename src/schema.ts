import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import { v4 } from 'uuid';

import QuestionType from './types/question';
import questionBank from './models/questions-bank';
import UserType from './types/user';
import Users from './models/user';

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'The query root of Doctordial service.',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: 'Returns all registered users',
      resolve: () => Users,
    },
    question: {
      type: QuestionType,
      description: 'Gets a single question',
      args: {
        questionID: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The ID of the question to get',
        },
      },
      resolve: (_, { questionID }) => {
        return questionBank[+questionID];
      },
    },
    questions: {
      type: new GraphQLList(QuestionType),
      description: 'Gets all the questions in the bank',
      resolve: () => {
        return questionBank;
      },
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutations for Doctordial service',
  fields: () => ({
    // addDoctor,
    // removeDoctor,
    // deletePatient,
    // blockPatient,
    createQuestion: {
      type: QuestionType,
      description: 'Create a question',
      args: {
        text: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The text of the question you want to create',
        },
      },
      resolve: (_, { text }, { req }) => {
        const newQuestion = {
          id: v4(),
          text,
          answers: [],
          author: req.user.id,
        };

        questionBank.push(newQuestion);

        return newQuestion;
      },
    },
    answerQuestion: {
      type: QuestionType,
      description: 'Create an answer to an already asked question',
      args: {
        text: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The text containing the answer to the question',
        },
        questionID: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The ID of the question to answer',
        },
      },
      resolve: (_, { text, questionID }, { req }) => {
        const question = questionBank.find(q => q.id === questionID);
        if (!question) {
          throw new Error('Question with this ID does not exist.');
        }

        const newAnswer = {
          id: v4(),
          text,
          author: req.user.id,
          upvotes: 0,
          downvotes: 0,
        };

        question.answers.push(newAnswer);

        return question;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query,
  mutation,
});

export default schema;
