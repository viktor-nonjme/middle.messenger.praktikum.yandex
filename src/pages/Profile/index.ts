import './index.scss';

import pepeAvatar from '../../assets/images/pepe.png';

import template from './index.template';

import Button from '../../UI/Button';
import tooltip from '../../UI/Tooltip';
import Link from '../../UI/Link';
import Spinner from '../../UI/Spinner';

import LinkToChat from '../../components/LinkToChat';
import FormAvatar from '../../components/FormAvatar';
import InputField from '../../components/InputField';

import Block from '../../utils/Block';
import Validation from '../../utils/Validation';
import { connect } from '../../utils/connect';

import AuthService from '../../services/auth';
import ProfileService from '../../services/profile';

import { BASE_URL_RESOURCES } from '../../consts';

import { TProps } from '../../types';

class ProfilePage extends Block {
  constructor(props: TProps) {
    const linkToChat = new LinkToChat({
      to: '/messenger',
    });

    const emailInput = new InputField({
      name: 'email',
      id: 'email',
      type: 'email',
      label: 'Почта',
      value: props.email,
      error: '',
      isRequired: 'required',
    });

    const loginInput = new InputField({
      name: 'login',
      id: 'login',
      type: 'text',
      label: 'Логин',
      value: props.login,
      error: '',
      minlength: '2',
      maxlength: '30',
      isRequired: 'required',
    });

    const firstNameInput = new InputField({
      name: 'first_name',
      id: 'firstName',
      type: 'text',
      label: 'Имя',
      value: props.first_name,
      error: '',
      minlength: '2',
      maxlength: '30',
      isRequired: 'required',
    });

    const secondNameInput = new InputField({
      name: 'second_name',
      id: 'secondName',
      type: 'text',
      label: 'Фамилия',
      value: props.second_name,
      error: '',
      minlength: '2',
      maxlength: '30',
      isRequired: 'required',
    });

    const phoneInput = new InputField({
      name: 'phone',
      id: 'phone',
      type: 'tel',
      label: 'Телефон',
      value: props.phone,
      error: '',
      isRequired: 'required',
    });

    const button = new Button({
      type: 'submit',
      title: 'Сохранить',
      isDisabled: '',
      disabledClassName: '',
    });

    const linkToPassword = new Link({
      className: '',
      to: '/settings/password',
      title: 'Изменить пароль',
    });

    const logoutButton = new Button(
      {
        className: 'button-logout',
        type: '',
        title: 'Выйти',
        isDisabled: '',
        disabledClassName: '',
      },
      {
        click: (event: Event) => {
          event.preventDefault();
          AuthService.logout();
        },
      },
    );

    const formAvatar = new FormAvatar({
      avatar: props.avatar ? BASE_URL_RESOURCES + props.avatar : pepeAvatar,
    });

    super({
      ...props,
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      displayName: props.display_name,
      phoneInput,
      button,
      tooltip,
      linkToPassword,
      logoutButton,
      linkToChat,
      formAvatar,
      Spinner,
      events: {
        change: (event: Event) => {
          event.preventDefault();

          let isValidForm: Boolean = false;

          setTimeout(() => {
            const children: {[key: string]: any} = Object.values(this.children);

            for (let i = 0; i < children.length; i += 1) {
              if (children[i].props.error !== undefined) {
                if (String(children[i].props.value).length > 0 && children[i].props.error.length === 0) {
                  isValidForm = true;
                } else {
                  isValidForm = false;
                  break;
                }
              }
            }
            console.log(isValidForm);
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

          if (form.name !== 'profile') {
            return;
          }

          const formIsValid = Validation.onSubmitValidation(form);

          const requestData: { [key: string]: string } = {
            first_name: '',
            second_name: '',
            display_name: '',
            login: '',
            email: '',
            password: '',
            phone: '',
          };

          Object.values(this.children).forEach((element) => {
            requestData[element.props.name] = String(element.props.value);
          });

          if (formIsValid) {
            ProfileService.editProfile(JSON.stringify(requestData));
          }
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}

function mapStateToProps(state: TProps) {
  const { user } = state;

  if (user) {
    return {
      first_name: user.first_name,
      second_name: user.second_name,
      display_name: `${user.first_name} ${user.second_name}`,
      login: user.login,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
    };
  }

  return {
    first_name: null,
    second_name: null,
    display_name: null,
    login: null,
    email: null,
    phone: null,
    avatar: null,
  };
}

export default connect(ProfilePage, mapStateToProps);
