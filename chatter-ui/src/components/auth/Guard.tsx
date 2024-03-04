import { useEffect } from 'react';
import excludedRoutes from '../../constants/excluded-routes';
import { useMe } from '../../hooks/useMe';
import { authenticatedVar } from '../../constants/authenticated';
import { snackVar } from '../../constants/snack';
import { UNKNOWN_ERROR_SNACK_MESSAGE } from '../../constants/errors';

interface GuardProps {
  children: JSX.Element;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user, error } = useMe();

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  useEffect(() => {
    if (error?.networkError) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }
  }, [error]);

  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
};

export default Guard;
