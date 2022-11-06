import './index.scss';
import '../../styles/profile.scss';
// @ts-ignore
import account from '../../assets/images/account.png';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import Block from '../../utils/Block';
import template from './index.template';
import Validation from '../../utils/Validation';

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
