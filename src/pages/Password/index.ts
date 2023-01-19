import './index.scss';
import pepeAvatar from '../../assets/images/pepe.png';

import template from './index.template';

import Spinner from '../../UI/Spinner';
import tooltip from '../../UI/Tooltip';
import Link from '../../UI/Link';
import Button from '../../UI/Button';

import InputField from '../../components/InputField';
import LinkToChat from '../../components/LinkToChat';
import FormAvatar from '../../components/FormAvatar';

import Validation from '../../utils/Validation';
import { connect } from '../../utils/connect';
import Block from '../../utils/Block';

import ProfileService from '../../services/profile';

import { BASE_URL_RESOURCES } from '../../consts';

import { TProps } from '../../types';

class PasswordPage extends Block {
  constructor(props: TProps) {
    const linkToChat = new LinkToChat({
      to: '/messenger',
    });

    const oldPassword = new InputField({
      name: 'oldPassword',
      id: 'oldPassword',
      type: 'password',
      label: 'Старый пароль',
      value: '',
      error: '',
      minlength: '8',
      maxlength: '30',
      isRequired: 'required',
    });

    const newPassword = new InputField({
      name: 'newPassword',
      id: 'newPassword',
      type: 'password',
      label: 'Новый пароль',
      value: '',
      error: '',
      minlength: '8',
      maxlength: '30',
      isRequired: 'required',
    });

    const newPasswordRepeat = new InputField({
      name: 'newPasswordRepeat',
      id: 'newPasswordRepeat',
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
      title: 'Сохранить',
      isDisabled: 'disabled',
      disabledClassName: 'button-primary-disabled',
    });

    const linkToProfile = new Link({
      className: '',
      to: '/settings',
      title: 'Назад в профиль',
    });

    const formAvatar = new FormAvatar({
      avatar: props.avatar ? BASE_URL_RESOURCES + props.avatar : pepeAvatar,
    });

    super({
      ...props,
      Spinner,
      formAvatar,
      tooltip,
      linkToChat,
      oldPassword,
      newPassword,
      newPasswordRepeat,
      button,
      linkToProfile,
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

          if (form.name !== 'password') {
            return;
          }

          const formIsValid = Validation.onSubmitValidation(form);

          const requestData: { [key: string]: string } = {
            oldPassword: '',
            newPassword: '',
          };

          Object.values(self.children).forEach((element) => {
            requestData[element.props.name] = element.props.value;
          });

          if (formIsValid) {
            ProfileService.editPassword(JSON.stringify(requestData), self.children);
            button.setProps({
              isDisabled: 'disabled',
              disabledClassName: 'button-primary-disabled',
            });
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

function mapUserToProps(state: TProps) {
  const { user } = state;
  if (user) {
    return {
      avatar: user.avatar,
    };
  }
  return {
    avatar: null,
  };
}

export default connect(PasswordPage, mapUserToProps);
