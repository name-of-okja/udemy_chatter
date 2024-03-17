import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import router from '../../Routes';
import { Chat } from '../../../gql/graphql';

interface ChatListitemProps {
  chat: Chat;
  selected: boolean;
}

const ChatListItem = ({
  chat: { name, _id, latestMessage },
  selected,
}: ChatListitemProps) => {
  return (
    <>
      <ListItem alignItems='flex-start' disablePadding>
        <ListItemButton
          onClick={() => router.navigate(`/chats/${_id}`)}
          selected={selected}
        >
          <ListItemAvatar>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  {latestMessage?.user.username || ''}
                </Typography>
                {' ' + (latestMessage?.content || '')}
              </>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider variant='inset' component='li' />
    </>
  );
};

export default ChatListItem;
