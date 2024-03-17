import { Link } from 'react-router-dom';
import { Link as MUILink, TextField } from '@mui/material';
import Auth from './Auth';
import { useCreateUser } from '../../hooks/useCreateUser';
import { useState } from 'react';
import { extractErrorMessage } from '../../utils/errors';
import { useLogin } from '../../hooks/useLogin';
import { UNKNOWN_ERROR_MESSAGE } from '../../constants/errors';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [createUser] = useCreateUser();
  const [error, setError] = useState('');
  const { login } = useLogin();

  return (
    <Auth
      submitLabel='Signup'
      error={error}
      extraFields={[
        <TextField
          type='text'
          label='User name'
          variant='outlined'
          value={username}
          error={!!error}
          helperText={error}
          onChange={(e) => setUsername(e.target.value)}
        />,
      ]}
      onSubmit={async ({ email, password }) => {
        try {
          await createUser({
            variables: {
              createUserInput: {
                email,
                username,
                password,
              },
            },
          });
          await login({ email, password });
          setError('');
        } catch (error) {
          const errorMessage = extractErrorMessage(error);
          if (errorMessage) {
            setError(errorMessage);
            return;
          }
          setError(UNKNOWN_ERROR_MESSAGE);
        }
      }}
    >
      <Link to={'/login'} style={{ alignSelf: 'center' }}>
        <MUILink>Login</MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;
