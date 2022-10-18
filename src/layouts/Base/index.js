import styles from "./index.module.scss";

function BaseLayout(children) {
  return () => {
    return `
        <div class="${styles.Container}">${children}</div>
    `;
  };
}

export default BaseLayout;
