import styles from "./index.module.scss";
import BaseLayout from "../../layouts/Base/";
import Input from "../../UI/Input/";
import Button from "../../UI/Button/";
import formStyles from "../../styles/form.module.scss";
import template from "./index.template";
import Templator from "../../utils/Templator";

const cls = [formStyles.Form];

if (styles.Modificator) {
  cls.push(styles.Modificator);
}

const classes = cls.join(" ");

const templator = new Templator(template);

const compiled = templator.compile({ classes });

export default BaseLayout(compiled);
