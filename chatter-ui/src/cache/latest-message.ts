import { ApolloCache } from '@apollo/client';
import { Message } from '../gql/graphql';
import { getChatsDocuments } from '../hooks/useGetChats';

export const updateLatestMessage = (
  cache: ApolloCache<any>,
  message: Message
) => {
  const chats = [
    ...(cache.readQuery({ query: getChatsDocuments })?.chats || []),
  ];

  const cachedChatIndex = chats.findIndex(
    (chat) => chat._id === message.chatId
  );

  if (cachedChatIndex === -1) {
    return;
  }

  const cachedChatCopy = { ...chats[cachedChatIndex] };

  cachedChatCopy.latestMessage = message;
  chats[cachedChatIndex] = cachedChatCopy;
  cache.writeQuery({
    query: getChatsDocuments,
    data: {
      chats,
    },
  });
};
