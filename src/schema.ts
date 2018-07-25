import { GraphQLObjectType, GraphQLSchema } from 'graphql';

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'The query root of Doctordial service.',
  fields: () => ({
    // question,
    // questions,
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
  mutation,
});

export default schema;
