import { useQuery } from '@apollo/client';
import { graphql } from '../gql';
import { QueryChatsArgs } from '../gql/graphql';

export const getChatsDocuments = graphql(`
  query Chats($skip: Int!, $limit: Int!) {
    chats(skip: $skip, limit: $limit) {
      ...ChatFragment
    }
  }
`);

const useGetChats = (variables: QueryChatsArgs) => {
  return useQuery(getChatsDocuments, { variables });
};

export { useGetChats };
