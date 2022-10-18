import Login from "./containers/Login/";
import Registration from "./containers/Registration/";
import Main from "./containers/Main/index.template";
import Profile from "./containers/Profile/";
import ServerError from "./containers/ServerError/";
import Password from "./containers/Password/";

export const pages = {
  "/": Main,
  "/login": Login({ isAuth: false }),
  "/registration": Registration(),
  "/profile": Profile(),
  "/server-error": ServerError(),
  "/profile/password": Password(),
};
