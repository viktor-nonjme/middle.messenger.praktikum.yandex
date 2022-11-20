import './index.scss';
import '../../styles/form.scss';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import Block from '../../utils/Block';
import template from './index.template';
import { events } from '../../utils/events';

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
