import './index.scss';
import '../../styles/form.scss';

import template from './index.template';

import InputField from '../../components/InputField';

import Button from '../../UI/Button';
import Link from '../../UI/Link';
import tooltip from '../../UI/Tooltip';

import Block from '../../utils/Block';
import Validation from '../../utils/Validation';

import AuthService from '../../services/auth';

export default class SignInPage extends Block {
  constructor() {
    const login = new InputField({
      name: 'login',
      id: 'login',
      type: 'text',
      label: 'Логин',
      value: '',
      error: '',
      minlength: '2',
      maxlength: '30',
      isRequired: 'required',
    });

    const password = new InputField({
      name: 'password',
      id: 'password',
      type: 'password',
      label: 'Пароль',
      value: '',
      error: '',
      minlength: '8',
      maxlength: '30',
      isRequired: 'required',
    });

    const button = new Button({
      type: 'submit',
      title: 'Авторизоваться',
      isDisabled: 'disabled',
      disabledClassName: 'button-primary-disabled',
    });

    const link = new Link({
      className: 'form-main-link',
      to: '/sign-up',
      title: 'Нет аккаунта?',
    });

    super({
      login,
      button,
      password,
      link,
      tooltip,
      events: {
        change: (event: Event) => {
          event.preventDefault();

          let isValidForm: Boolean = false;

          setTimeout(() => {
            const children: {[key: string]: any} = Object.values(self.children);

            for (let i = 0; i < children.length; i += 1) {
              if (children[i].props.error !== undefined) {
                if (children[i].props.value.length > 0 && children[i].props.error.length === 0) {
                  isValidForm = true;
                } else {
                  isValidForm = false;
                  break;
                }
              }
            }

            if (isValidForm) {
              button.setProps({ isDisabled: '', disabledClassName: '' });
            } else {
              button.setProps({
                isDisabled: 'disabled',
                disabledClassName: 'button-primary-disabled',
              });
            }
          }, 100);
        },
        submit: async (event: Event) => {
          event.preventDefault();

          const form = event.target as HTMLFormElement;

          const formIsValid = Validation.onSubmitValidation(form);

          const requestData: { [key: string]: string } = {
            email: '',
            password: '',
          };

          Object.values(self.children).forEach((element) => {
            requestData[element.props.name] = element.props.value;
          });

          if (formIsValid) {
            await AuthService.signin(JSON.stringify(requestData), self.children);
          }
        },
      },
    });
    const self = this;
  }

  render() {
    return this.compile(template);
  }
}
