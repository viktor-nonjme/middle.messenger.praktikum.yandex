import profileStyles from "../../styles/profile.module.scss";
import styles from "./index.module.scss";
import ProfileLayout from "../../layouts/Profile/";
import account from "../../assets/images/account.png";
import template from "./index.template";
import Templator from "../../utils/Templator";

const cls = [profileStyles.Profile];

if (styles.Modificator) {
  cls.push(styles.Modificator);
}

const classes = cls.join(" ");

const templator = new Templator(template);

const compiled = templator.compile({ classes, account });

export default ProfileLayout(compiled);
