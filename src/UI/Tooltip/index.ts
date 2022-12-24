import './index.scss';

import template from './index.template';

import Block from '../../utils/Block';

class Tooltip extends Block {
  constructor(props: { [key: string]: string }) {
    super({
      ...props,
      events: {
        click: () => {
          this.setProps({ type: 'hidden', text: '' });
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}

export default new Tooltip({
  type: '',
  text: '',
});
