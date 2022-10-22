import Templator from "../../utils/Templator";
import "./index.scss";

export function Input(props) {
  return `
        <div class="form-input-item">
            <label class="label" for="${props.id}">${props.label}</label>
            <input class="input" name="${props.name}" id="${props.id}" type="${props.type}" value="${props.value}" />
            <span class="error">${props.error}</span>
        </div>
    `;
}

Templator.prototype.Input = Input;
