import { useEffect } from 'react';
import excludedRoutes from '../../constants/excluded-routes';
import { useMe } from '../../hooks/useMe';
import { authenticatedVar } from '../../constants/authenticated';

interface GuardProps {
  children: JSX.Element;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user } = useMe();

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
};

export default Guard;
