import "./index.scss";
import Templator from "../../utils/Templator";

export const Button = (props) => {
  return `<button class="button-primary" type="${props.type}">${props.title}</button>`;
};

Templator.prototype.Button = Button;
