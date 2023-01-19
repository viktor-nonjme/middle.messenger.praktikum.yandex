import template from './index.template';

import Block from '../../utils/Block';
import Store from '../../utils/Store';

import InputField from '../InputField';
import SearchedUsers from '../SearchedUsers';

import Button from '../../UI/Button';

import ProfileService from '../../services/profile';
import ChatService from '../../services/chat';

import { TProps } from '../../types';

class PopupAddUsers extends Block {
  constructor(props: TProps) {
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
      title: 'Добавить',
      isDisabled: '',
      disabledClassName: '',
    });

    super({
      ...props,
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

          const chatId = Store.getState().currentChat.id;

          const selectedUsersId = SearchedUsers.props.selectedUsers.map((select: TProps) => select.id);

          const request = JSON.stringify({ users: [...selectedUsersId], chatId });

          ChatService.addUsersToChat(request);
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}

export default new PopupAddUsers({});
