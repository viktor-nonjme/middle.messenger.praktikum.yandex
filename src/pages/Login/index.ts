import './index.scss';
import '../../styles/form.scss';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import Block from '../../utils/Block';
import template from './index.template';
import Validation from '../../utils/Validation';

export default class LoginPage extends Block {
  constructor() {
    const state = {};
    const login = new Input({
      name: 'login', id: 'login', type: 'text', label: 'Логин', value: '', error: '',
    });

    const password = new Input({
      name: 'password', id: 'password', type: 'password', label: 'Пароль', value: '', error: '',
    });

    const button = new Button({
      type: 'submit', title: 'Авторизоваться',
    });

    super({
      login,
      button,
      password,
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
