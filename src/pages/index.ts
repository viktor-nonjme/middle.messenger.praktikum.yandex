import { ChatPage } from './Chat';
import { ServerError } from './ServerError';
import LoginPage from './Login';
import RegistrationPage from './Registration';
import ProfilePage from './Profile';
import PasswordPage from './Password';

export const pages: Record<string, any> = {
  '/': new ChatPage(),
  '/id123': new ChatPage(),
  '/login': new LoginPage(),
  '/registration': new RegistrationPage(),
  '/profile': new ProfilePage(),
  '/server-error': new ServerError(),
  '/profile/password': new PasswordPage(),
};
