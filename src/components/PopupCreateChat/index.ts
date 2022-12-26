import './index.scss';

import template from './index.template';

import Block from '../../utils/Block';

import InputField from '../InputField';
import SearchedUsers from '../SearchedUsers';

import Button from '../../UI/Button';

import ProfileService from '../../services/profile';
import ChatService from '../../services/chat';

import { TProps } from '../../types';

class PopupCreateChat extends Block {
  constructor(props: TProps) {
    const inputNameChat = new InputField({
      name: 'chat_name',
      id: 'chatName',
      type: 'text',
      label: 'Название нового чата',
      value: '',
      error: '',
      minlength: '2',
      maxlength: '30',
      isRequired: 'required',
    });

    const inputFindUsers = new InputField({
      name: 'find_users',
      id: 'findUsers',
      type: 'text',
      label: 'Найти пользователей',
      placeholder: 'Введите логин',
      value: '',
      error: '',
      minlength: '2',
      maxlength: '30',
    });

    const button = new Button({
      type: 'submit',
      title: 'Создать',
      isDisabled: '',
      disabledClassName: '',
    });

    super({
      ...props,
      inputNameChat,
      inputFindUsers,
      button,
      isOpened: false,
      SearchedUsers,
      events: {
        click: (event: Event) => {
          if ((event.target! as Element).classList.contains('opened')) {
            this.setProps({ isOpened: false });
          }
        },
        input: (event: Event) => {
          if ((event.target! as Element).id === 'findUsers') {
            const element = event.target as HTMLInputElement;

            const { value } = element;

            ProfileService.searchUserByLogin(JSON.stringify({ login: value }), SearchedUsers);
          }
        },
        submit: (event: Event) => {
          event.preventDefault();

          const selectedUsersId = SearchedUsers.props.selectedUsers.map((select: TProps) => select.id);

          const title = inputNameChat.props.value;

          ChatService.createChat(JSON.stringify({ title }), selectedUsersId);
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}

export default new PopupCreateChat({});
