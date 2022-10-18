import BaseLayout from "../../layouts/Base";
import formStyles from "../../styles/form.module.scss";
import Input from "../../UI/Input/";
import Button from "../../UI/Button/";
import template from "./index.template";
import Templator from "../../utils/Templator";

const classes = formStyles.Form;

const templator = new Templator(template);

const compiled = templator.compile({ classes });

export default BaseLayout(compiled);
