import excludedRoutes from '../../constants/excluded-routes';
import { useMe } from '../../hooks/useMe';

interface GuardProps {
  children: JSX.Element;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user } = useMe();
  console.log(user);

  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
};

export default Guard;
