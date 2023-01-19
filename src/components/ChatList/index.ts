import './index.scss';

import template from './index.template';

import pepeAvatar from '../../assets/images/pepe.png';
import searchIcon from '../../assets/images/search.svg';

import Block from '../../utils/Block';

import ButtonClose from '../../UI/ButtonClose';

import ProfileService from '../../services/profile';
import ChatService from '../../services/chat';

import { BASE_URL_RESOURCES } from '../../consts';

import { TProps } from '../../types';

class ChatList extends Block {
  constructor(props: TProps) {
    const buttonClose = new ButtonClose();

    super({
      ...props,
      buttonClose,
      baseUrl: BASE_URL_RESOURCES,
      avatar: pepeAvatar,
      searchIcon,
      isUsers: false,
      users: [],
      events: {
        click: (event: Event) => {
          const chatListItem = event.target as Element;

          const userElement = chatListItem.closest('.chat-list-user-item') as HTMLElement;

          if (userElement && userElement.dataset) {
            const id = userElement.dataset.userId as string;

            ProfileService.findUserById(id);
          }

          const chatElement = chatListItem.closest('.chat-list-item') as HTMLElement;

          if (chatElement && chatElement.dataset) {
            const id = chatElement.dataset.chatId as string;

            const title = chatElement.querySelector('.chat-list-item-title')!.textContent;

            ChatService.startChating(id, title, true);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}

export default new ChatList({});
