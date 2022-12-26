import './index.scss';
import template from './index.template';
import Block from '../../utils/Block';

export default class Message extends Block {
  constructor(props: { [key: string]: string }) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template);
  }
}
