import './index.scss';
import template from './index.template';
import Block from '../../utils/Block';

class Spinner extends Block {
  constructor(props: { [key: string]: boolean }) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template);
  }
}

export default new Spinner({ isHidden: true });
