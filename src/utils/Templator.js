class Templator {
  constructor(template) {
    this.template = template;

    this.TEMPLATE_REGEXP = /\{\{[^>](.*?)\}\}/gi;
    this.PARTIALS_REGEXP = /\{\{>(.*?)\}\}/gi;
    this.PARTIALS_OPTIONS_REGEXP = /(\w*)=(\S*|\w*)?/gi;
  }

  compile(ctx) {
    return this._compileTemplate(ctx);
  }

  _compileTemplate(ctx) {
    let key = null;
    let tmpl = this.template;

    while ((key = this.TEMPLATE_REGEXP.exec(tmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim();

        const data = this._get(ctx, tmplValue);

        tmpl = tmpl.replace(new RegExp(key[0], "gi"), data);
      }
    }

    while ((key = this.PARTIALS_REGEXP.exec(tmpl))) {
      const partial = key[1].trimStart().split(" ")[0];

      if (this[partial]) {
        const data = this[partial](this._getProps(key[1]));

        tmpl = tmpl.replace(new RegExp(key[0], "gi"), data);
      }
    }

    return tmpl;
  }

  _getProps(str) {
    const resultProps = {};

    const props = str.match(this.PARTIALS_OPTIONS_REGEXP);

    if (props === null) {
      return {};
    }

    props.forEach((item) => {
      const option = item.split("=");
      resultProps[option[0]] = option[1] ? option[1] : "";
    });

    return resultProps;
  }

  _get(obj, path) {
    const keys = path.split(".");

    let result = obj;
    for (let key of keys) {
      const value = result[key];

      if (!value) {
        return undefined;
      }

      result = value;
    }

    return result;
  }
}

export default Templator;
