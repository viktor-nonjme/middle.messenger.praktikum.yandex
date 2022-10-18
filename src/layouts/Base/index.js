import "./index.scss";

export function BaseLayout(children) {
  return () => {
    return `
        <div class="container-base">${children}</div>
    `;
  };
}
