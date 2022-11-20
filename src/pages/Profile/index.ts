import './index.scss';
import '../../styles/profile.scss';
// @ts-ignore
import account from '../../assets/images/account.png';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import Block from '../../utils/Block';
import template from './index.template';
import { events } from '../../utils/events';

export default class ProfilePage extends Block {
  constructor() {
    const state = {};

    const email = new Input({
      name: 'email', id: 'email', type: 'email', label: 'Почта', value: 'smg93880@gmail.com', error: '',
    });

    const login = new Input({
      name: 'login', id: 'login', type: 'text', label: 'Логин', value: 'viktornonjme', error: '',
    });

    const firstName = new Input({
      name: 'first_name', id: 'firstName', type: 'text', label: 'Имя', value: 'Виктор', error: '',
    });

    const secondName = new Input({
      name: 'second_name', id: 'secondName', type: 'text', label: 'Фамилия', value: 'Кулешов', error: '',
    });

    const phone = new Input({
      name: 'phone', id: 'phone', type: 'tel', label: 'Телефон', value: '375296668084', error: '',
    });

    const button = new Button({
      type: 'submit', title: 'Сохранить',
    });

    super({
      account,
      email,
      login,
      firstName,
      secondName,
      phone,
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
