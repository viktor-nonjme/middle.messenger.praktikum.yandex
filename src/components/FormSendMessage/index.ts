import template from './index.template';

import MessagesService from '../../services/messages';

import Block from '../../utils/Block';
import Validation from '../../utils/Validation';

import Tooltip from '../../UI/Tooltip';

export default class FormSendMessage extends Block {
  constructor(props: { [key: string]: string }) {
    super({
      ...props,
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formName = form.name as string;
          const formIsValid = Validation.onSubmitValidation(form);
          const input = form.elements[formName as any] as HTMLInputElement;
          const { error } = Validation.checkElement(input);

          if (formIsValid) {
            MessagesService.sendMessage(input.value);

            this.setProps({
              value: '',
              error: '',
            });
          } else {
            Tooltip.setProps({ type: 'warning', text: `Произошла ошибка: ${error}` });
          }
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
