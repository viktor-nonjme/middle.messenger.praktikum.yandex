import './index.scss';
import template from './index.template';
import Block from '../../utils/Block';

export default class Button extends Block {
  constructor(props: Record<string, any>, events?: { [key: string]: (event: Event) => void }) {
    super({
      ...props,
      events: { ...events },
    });
  }

  render() {
    return this.compile(template);
  }
}
