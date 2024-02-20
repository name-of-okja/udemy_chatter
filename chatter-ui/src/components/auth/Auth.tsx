import { Button, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMe } from '../../hooks/useMe';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
  submitLabel: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  error?: string;
  children: React.ReactNode;
}
const Auth = ({ submitLabel, onSubmit, error, children }: AuthProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data } = useMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate('/');
    }
  }, [data, navigate]);

  return (
    <Stack
      spacing={3}
      sx={{
        height: '100vh',
        maxWidth: {
          xs: '70%',
          md: '30%',
        },
        margin: '0 auto',
        justifyContent: 'center',
      }}
    >
      <TextField
        type='email'
        label='Email'
        variant='outlined'
        value={email}
        error={!!error}
        helperText={error}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type='password'
        label='Password'
        variant='outlined'
        value={password}
        error={!!error}
        helperText={error}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant='contained' onClick={() => onSubmit({ email, password })}>
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
};

export default Auth;
