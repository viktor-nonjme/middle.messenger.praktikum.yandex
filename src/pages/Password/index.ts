import './index.scss';
import '../../styles/profile.scss';
// @ts-ignore
import account from '../../assets/images/account.png';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import Block from '../../utils/Block';
import template from './index.template';
import { events } from '../../utils/events';

export default class PasswordPage extends Block {
  constructor() {
    const state = {};

    const oldPassword = new Input({
      name: 'oldPassword', id: 'oldPassword', type: 'password', label: 'Старый пароль', value: '', error: '',
    });

    const newPassword = new Input({
      name: 'newPassword', id: 'newPassword', type: 'password', label: 'Новый пароль', value: '', error: '',
    });

    const newPasswordRepeat = new Input({
      name: 'newPasswordRepeat', id: 'newPasswordRepeat', type: 'password', label: 'Повторите пароль', value: '', error: '',
    });

    const button = new Button({
      type: 'submit', title: 'Сохранить',
    });

    super({
      account,
      oldPassword,
      newPassword,
      newPasswordRepeat,
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
