import "../../styles/form.scss";
import { BaseLayout } from "../../layouts/Base";
import template from "./index.template";
import Templator from "../../utils/Templator";

const templator = new Templator(template);

const compiled = templator.compile();

export default BaseLayout(compiled);
