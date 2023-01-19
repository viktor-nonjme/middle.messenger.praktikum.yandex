import './styles/index.scss';
import './assets/fonts/index.scss';

import { NotFoundPage } from './pages/Error';
import ChatPage from './pages/Chat';
import { ServerError } from './pages/ServerError';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import ProfilePage from './pages/Profile';
import PasswordPage from './pages/Password';

import Router from './utils/Router';

import AuthService from './services/auth';

const Routes = {
  Login: '/',
  Registration: '/sign-up',
  Profile: '/settings',
  Messenger: '/messenger',
  Server: '/server-error',
  Password: '/settings/password',
  NotFound: '*',
};

window.addEventListener('DOMContentLoaded', async () => {
  await AuthService.getUser();

  Router
    .use(Routes.Messenger, ChatPage, { isProtectedRoute: true })
    .use(Routes.Login, SignInPage, { isProtectedRoute: false })
    .use(Routes.Registration, SignUpPage, { isProtectedRoute: false })
    .use(Routes.Profile, ProfilePage, { isProtectedRoute: true })
    .use(Routes.Server, ServerError, { isProtectedRoute: false })
    .use(Routes.Password, PasswordPage, { isProtectedRoute: true })
    .use(Routes.NotFound, NotFoundPage, { isProtectedRoute: false })
    .redirect('/');

  Router.start();
});
