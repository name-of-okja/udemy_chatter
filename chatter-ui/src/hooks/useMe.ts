import { gql, useQuery } from '@apollo/client';
import { User } from '../models/User';

const ME = gql`
  query Me {
    me {
      _id
      email
    }
  }
`;

const useMe = () => {
  return useQuery<{ me: User }>(ME);
};

export { useMe };
