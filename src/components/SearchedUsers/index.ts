import './index.scss';
import '../ChatList/index.scss';

import template from './index.template';

import pepeAvatar from '../../assets/images/pepe.png';
import searchIcon from '../../assets/images/search.svg';

import Block from '../../utils/Block';

import { BASE_URL_RESOURCES } from '../../consts';

import { TProps } from '../../types';

class SearchedUsers extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      baseUrl: BASE_URL_RESOURCES,
      avatar: pepeAvatar,
      searchIcon,
      selectedUsers: [],
      users: props.users,
      events: {
        click: (event: Event) => {
          if ((event.target! as Element).classList.contains('select-user')) {
            const user = (event.target! as Element).closest('.chat-list-user-item') as HTMLElement;

            const selectUserId = Number(user.dataset.userId);

            const selectedUser = this.props.users.filter((select: TProps) => selectUserId === select.id);

            const isSelected = this.props.selectedUsers.find((select: TProps) => selectUserId === select.id);

            if (!isSelected) {
              const selectedUsers = [...this.props.selectedUsers, ...selectedUser];

              this.setProps({
                selectedUsers,
                users: this.props.users.filter((select: TProps) => selectUserId !== select.id),
              });
            }
          }

          if ((event.target! as Element).classList.contains('unselect-user')) {
            const user = (event.target! as Element).closest('.chat-list-user-item') as HTMLElement;

            const selectUserId = Number(user.dataset.userId);

            const selectedUser = this.props.selectedUsers.filter((select: TProps) => selectUserId === select.id);

            const unSelectedUsers = this.props.selectedUsers.filter((select: TProps) => selectUserId !== select.id);

            const selectedUsers = [...unSelectedUsers];

            const users = [...selectedUser, ...this.props.users];

            this.setProps({
              selectedUsers,
              users,
            });
          }
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}

export default new SearchedUsers({});
