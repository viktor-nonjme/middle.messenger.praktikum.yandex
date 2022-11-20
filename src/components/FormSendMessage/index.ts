import template from './index.template';
import Block from '../../utils/Block';
import Validation from '../../utils/Validation';
import { events } from '../../utils/events';

type FormSendProps = { [key: string]: string };

export default class FormSendMessage extends Block {
  constructor(props: FormSendProps) {
    const state = {};
    super({
      ...props,
      events: {
        input: (event: Event) => events.input(event, state),
        submit: (event: Event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formIsValid = Validation.onSubmitValidation(form);
          console.log('formIsValid', formIsValid);
          self.setProps({
            value: '',
            error: '',
          });
        },
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
