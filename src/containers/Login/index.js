import "./index.scss";
import { BaseLayout } from "../../layouts/Base/";
import Input from "../../UI/Input/";
import Button from "../../UI/Button/";
import "../../styles/form.scss";
import template from "./index.template";
import Templator from "../../utils/Templator";

const templator = new Templator(template);

const compiled = templator.compile();

export default BaseLayout(compiled);
