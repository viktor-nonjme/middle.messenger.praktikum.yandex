import './index.scss';
import template from './index.template';
import Block from '../../utils/Block';
import { events } from '../../utils/events';

type FormInputProps = { [key: string]: string };

export default class Input extends Block {
  constructor(props: FormInputProps) {
    super({
      ...props,
      events: {
        focus: events.focus,
        blur: (event: Event) => events.blur(self, event),
      },
    });
    const self = this;
  }

  render() {
    return this.compile(template);
  }
}
