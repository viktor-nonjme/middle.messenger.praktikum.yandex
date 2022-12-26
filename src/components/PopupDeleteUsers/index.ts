import template from './index.template';

import Block from '../../utils/Block';

import SearchedUsers from '../SearchedUsers';

import Button from '../../UI/Button';

import ChatService from '../../services/chat';

import { TProps } from '../../types';

class PopupDeleteUsers extends Block {
  constructor(props: TProps) {
    const button = new Button({
      type: 'submit',
      title: 'Удалить',
      isDisabled: '',
      disabledClassName: '',
    });

    super({
      ...props,
      button,
      isOpened: false,
      SearchedUsers,
      events: {
        click: (event: Event) => {
          if ((event.target! as Element).classList.contains('opened')) {
            this.setProps({ isOpened: false });
          }
        },
        submit: (event: Event) => {
          event.preventDefault();

          const selectedUsersId = SearchedUsers.props.selectedUsers.map((select: TProps) => select.id);

          ChatService.deleteUsersFromChat(selectedUsersId);
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}

export default new PopupDeleteUsers({});
