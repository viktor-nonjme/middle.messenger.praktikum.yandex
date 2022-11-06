import './styles/index.scss';
import './assets/fonts/index.scss';
import renderDOM from './utils/renderDOM';
import { pages } from './pages/index';
import { Error } from './pages/Error';

const page = pages[window.location.pathname] || new Error();

renderDOM('root', page);
