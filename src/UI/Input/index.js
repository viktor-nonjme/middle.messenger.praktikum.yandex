import styles from "./index.module.scss";
import Templator from "../../utils/Templator";

function Input(props) {
  return `
        <div class="${styles.Input}">
            <label for="${props.id}">${props.label}</label>
            <input name="${props.name}" id="${props.id}" type="${props.type}" value="${props.value}" />
            <span>${props.error}</span>
        </div>
    `;
}

Templator.prototype.Input = Input;

export default Input;
