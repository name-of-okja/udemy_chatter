import { SyntheticEvent, forwardRef } from 'react';
import { Snackbar as MUISnackbar, Stack } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useReactiveVar } from '@apollo/client';
import { snackVar } from '../../constants/snack';
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Snackbar = () => {
  const snack = useReactiveVar(snackVar);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    snackVar(undefined);
  };

  return (
    <>
      {snack && (
        <Stack spacing={2} sx={{ width: '100%' }}>
          <MUISnackbar
            open={!!snack}
            autoHideDuration={6000}
            onClick={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={snack?.type}
              sx={{ width: '100%' }}
            >
              {snack.message}
            </Alert>
          </MUISnackbar>
        </Stack>
      )}
    </>
  );
};

export default Snackbar;
