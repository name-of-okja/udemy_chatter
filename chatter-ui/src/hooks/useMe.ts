import { useQuery } from '@apollo/client';
import { graphql } from '../gql';

const meDocument = graphql(`
  query Me {
    me {
      _id
      email
    }
  }
`);

const useMe = () => {
  return useQuery(meDocument);
};

export { useMe };
