import './index.scss';
import template from './index.template';
import Block from '../../utils/Block';
import Validation from '../../utils/Validation';

type FormInputProps = { [key: string]: string };

export default class Input extends Block {
  constructor(props: FormInputProps) {
    super({
      ...props,
      events: {
        focus: () => {},
        blur: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          const element = event.target as HTMLInputElement;
          const { value, error } = Validation.checkElement(element);
          if (value) {
            this.setProps({
              value,
              error,
            });
          }
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
