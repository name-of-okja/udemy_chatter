import { useQuery } from '@apollo/client';
import { graphql } from '../gql';

const meDocument = graphql(`
  query Me {
    me {
      ...UserFragment
    }
  }
`);

const useMe = () => {
  return useQuery(meDocument);
};

export { useMe };
