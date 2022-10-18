import styles from "./index.module.scss";
import Templator from "../../utils/Templator";

const Button = (props) => {
  return `<button class="${styles.Button}" type="${props.type}">${props.title}</button>`;
};

Templator.prototype.Button = Button;

export default Button;
