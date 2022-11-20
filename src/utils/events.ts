import Block from './Block';
import Validation from './Validation';

export const events = {
  input: (event: Event, state: Record<string, any>) => {
    const element = event.target as HTMLInputElement;
    const elementName = element.name;
    const { value } = element;
    Object.assign(state, { [elementName]: value });
    console.log('formInputs', state);
  },
  submit: (self: Block, event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formIsValid = Validation.onSubmitValidation(form);
    Object.values(self.children).forEach((element) => {
      element.setProps({ value: '', error: '' });
    });
    console.log('formIsValid', formIsValid);
  },
  focus: (event: Event) => {
    // @ts-ignore
    if (event.target?.nodeName === 'INPUT') {
      const element = event.target as HTMLInputElement;
      const { error } = Validation.checkElement(element);
      element.nextElementSibling!.textContent = error;
    }
  },
  blur(self: Block, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const element = event.target as HTMLInputElement;
    if (element!.nodeName === 'INPUT') {
      const { value, error } = Validation.checkElement(element);
      self.setProps({
        value,
        error,
      });
    }
  },
};
