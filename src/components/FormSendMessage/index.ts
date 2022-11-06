import template from './index.template';
import Block from '../../utils/Block';
import Validation from '../../utils/Validation';

export default class FormSendMessage extends Block {
  constructor() {
    const state = {};
    super({
      value: '',
      error: '',
      events: {
        input: (event: Event) => {
          const element = event.target as HTMLInputElement;
          const elementName = element.name;
          const { value } = element;
          Object.assign(state, { [elementName]: value });
          console.log('formInputs', state);
        },
        submit: (event: Event) => {
          event.preventDefault();
          // @ts-ignore
          const form: any = event.target;
          const formIsValid = Validation.onSubmitValidation(form);
          console.log('formIsValid', formIsValid);
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
