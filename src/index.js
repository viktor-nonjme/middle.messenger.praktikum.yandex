import Error from "./containers/Error/";
import { pages } from "./pages";
import "./styles/index.scss";
import "./assets/fonts/index.scss";

document.getElementById("root").innerHTML =
  pages[window.location.pathname] || Error();
