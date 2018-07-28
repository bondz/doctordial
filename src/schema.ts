import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';

import QuestionType from './types/question';
import questionBank from './models/questions-bank';

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'The query root of Doctordial service.',
  fields: () => ({
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
    // createQuestion,
    // answerQuestion
  }),
});

const schema = new GraphQLSchema({
  query,
  // mutation,
});

export default schema;
