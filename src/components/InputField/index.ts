import './index.scss';

import template from './index.template';

import Block from '../../utils/Block';

import Validation from '../../utils/Validation';

export default class Input extends Block {
  constructor(props: { [key: string]: string }) {
    super({
      ...props,
      events: {
        change(event: Event) {
          const element = event.target as HTMLInputElement;
          if (element!.nodeName === 'INPUT') {
            const { value, error } = Validation.checkElement(element);
            self.setProps({
              value,
              error,
            });
          }
        },
        focus(event: Event) {
          const element = event.target as HTMLInputElement;
          if (element?.nodeName === 'INPUT') {
            const { error } = Validation.checkElement(element);
            element.nextElementSibling!.textContent = error;
          }
        },
        blur(event: Event) {
          event.preventDefault();
          event.stopPropagation();
          const element = event.target as HTMLInputElement;
          if (element?.nodeName === 'INPUT') {
            const { error } = Validation.checkElement(element);

            element.nextElementSibling!.textContent = error;
          }
        },
      },
    });
    const self = this;
  }

  render() {
    return this.compile(template);
  }
}
