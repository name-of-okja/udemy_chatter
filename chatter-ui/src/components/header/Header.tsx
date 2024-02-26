import { AppBar, Container, Toolbar } from '@mui/material';
import Branding from './Branding';
import MobileNavigation from './mobile/MobileNavigation';
import MobileBranding from './mobile/MobileBranding';
import Navigation from './Navigation';
import Settings from './Settings';
import { useReactiveVar } from '@apollo/client';
import { authenticatedVar } from '../../constants/authenticated';
import { Page } from '../../interfaces/page.interface';

const pages: Page[] = [
  {
    title: 'Home',
    path: '/',
  },
];

const unauthenticatedPages: Page[] = [
  { title: 'Login', path: '/login' },
  {
    title: 'Signup',
    path: '/signup',
  },
];

const Header = () => {
  const authenticated = useReactiveVar(authenticatedVar);

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Branding />
          <Navigation pages={authenticated ? pages : unauthenticatedPages} />
          <MobileNavigation
            pages={authenticated ? pages : unauthenticatedPages}
          />
          <MobileBranding />
          {authenticated && <Settings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
