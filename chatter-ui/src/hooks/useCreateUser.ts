import { useMutation } from '@apollo/client';
import { graphql } from '../gql';

const createUserDocumnet = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
    }
  }
`);

const useCreateUser = () => {
  return useMutation(createUserDocumnet);
};

export { useCreateUser };
