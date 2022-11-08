import '../../styles/form.scss';
import '../../styles/container.scss';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import Block from '../../utils/Block';
import template from './index.template';
import { events } from '../../utils/events';

export default class RegistrationPage extends Block {
  constructor() {
    const state = {};

    const email = new Input({
      name: 'email', id: 'email', type: 'email', label: 'Почта', value: '', error: '',
    });

    const login = new Input({
      name: 'login', id: 'login', type: 'text', label: 'Логин', value: '', error: '',
    });

    const firstName = new Input({
      name: 'first_name', id: 'firstName', type: 'text', label: 'Имя', value: '', error: '',
    });

    const secondName = new Input({
      name: 'second_name', id: 'secondName', type: 'text', label: 'Фамилия', value: '', error: '',
    });

    const phone = new Input({
      name: 'phone', id: 'phone', type: 'tel', label: 'Телефон', value: '', error: '',
    });

    const password = new Input({
      name: 'password', id: 'password', type: 'password', label: 'Пароль', value: '', error: '',
    });

    const passwordRepeat = new Input({
      name: 'password_repeat', id: 'passwordRepeat', type: 'password', label: 'Повторите пароль', value: '', error: '',
    });

    const button = new Button({
      type: 'submit', title: 'Авторизоваться',
    });

    super({
      email,
      login,
      firstName,
      secondName,
      phone,
      password,
      passwordRepeat,
      button,
      events: {
        input: (event: Event) => events.input(event, state),
        submit: (event: Event) => events.submit(self, event),
      },
    });
    const self = this;
  }

  render() {
    return this.compile(template);
  }
}
