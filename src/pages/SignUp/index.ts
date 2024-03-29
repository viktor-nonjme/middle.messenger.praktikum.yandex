import '../../styles/form.scss';
import '../../styles/container.scss';

import template from './index.template';

import InputField from '../../components/InputField';

import Button from '../../UI/Button';
import tooltip from '../../UI/Tooltip';
import Link from '../../UI/Link';
import Spinner from '../../UI/Spinner';

import Block from '../../utils/Block';
import Validation from '../../utils/Validation';

import AuthService from '../../services/auth';

export default class SignUpPage extends Block {
  constructor() {
    const email = new InputField({
      name: 'email',
      id: 'email',
      type: 'email',
      label: 'Почта',
      value: '',
      error: '',
      isRequired: 'required',
    });

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

    const firstName = new InputField({
      name: 'first_name',
      id: 'firstName',
      type: 'text',
      label: 'Имя',
      value: '',
      error: '',
      minlength: '2',
      maxlength: '30',
      isRequired: 'required',
    });

    const secondName = new InputField({
      name: 'second_name',
      id: 'secondName',
      type: 'text',
      label: 'Фамилия',
      value: '',
      error: '',
      minlength: '2',
      maxlength: '30',
      isRequired: 'required',
    });

    const phone = new InputField({
      name: 'phone',
      id: 'phone',
      type: 'tel',
      label: 'Телефон',
      value: '',
      error: '',
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

    const passwordRepeat = new InputField({
      name: 'password_repeat',
      id: 'passwordRepeat',
      type: 'password',
      label: 'Повторите пароль',
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
      to: '/',
      title: 'Войти',
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
      link,
      tooltip,
      Spinner,
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
        submit: (event: Event) => {
          event.preventDefault();

          const form = event.target as HTMLFormElement;

          const formIsValid = Validation.onSubmitValidation(form);

          const requestData: { [key: string]: string } = {
            first_name: '',
            second_name: '',
            login: '',
            email: '',
            password: '',
            phone: '',
          };

          Object.values(self.children).forEach((element) => {
            requestData[element.props.name] = element.props.value;
          });

          if (formIsValid) {
            AuthService.signup(JSON.stringify(requestData), self.children);
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
