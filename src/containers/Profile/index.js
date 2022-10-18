import "./index.scss";
import "../../styles/profile.scss";
import ProfileLayout from "../../layouts/Profile/";
import account from "../../assets/images/account.png";
import template from "./index.template";
import Templator from "../../utils/Templator";

const templator = new Templator(template);

const compiled = templator.compile({ account });

export default ProfileLayout(compiled);
