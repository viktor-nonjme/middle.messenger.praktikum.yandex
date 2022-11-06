import './index.scss';
import template from './index.template';
import Block from '../../utils/Block';

export default class Input extends Block {
  constructor(props: Record<string, any>) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template);
  }
}
