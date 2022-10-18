import styles from "../../styles/error.module.scss";
import BaseLayout from "../../layouts/Base";
import template from "./index.template";
import Templator from "../../utils/Templator";

const templator = new Templator(template);

const classes = styles.Error;

const compiled = templator.compile({ classes });

export default BaseLayout(compiled);
