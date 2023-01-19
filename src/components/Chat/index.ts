import './index.scss';

import pepeAvatar from '../../assets/images/pepe.png';

import template from './index.template';

import Block from '../../utils/Block';
import { connect } from '../../utils/connect';
import { toDate } from '../../utils/helpers';

import FormSendMessage from '../FormSendMessage';
import EmptyChat from '../EmptyChat';
import SelectedUser from '../SelectedUser';
import MessageComponent from '../Message';
import SearchedUsers from '../SearchedUsers';

import PopupAddUsers from '../PopupAddUsers';
import PopupDeleteUsers from '../PopupDeleteUsers';

import { StoreInterface, TProps, Message } from '../../types';

import { BASE_URL_RESOURCES } from '../../consts';

import ChatService from '../../services/chat';

class Chat extends Block {
  constructor(props: TProps) {
    const emptyChat = new EmptyChat();

    const FoundUser = new SelectedUser();

    const formSendMessage = new FormSendMessage({});

    const isEmptyChat = props.emptyChat === false ? props.emptyChat : true;

    super({
      ...props,
      defaultAvatar: pepeAvatar,
      baseUrl: BASE_URL_RESOURCES,
      emptyChat,
      formSendMessage,
      FoundUser,
      currentChat: props.currentChat,
      isEmptyChat,
      selectedUser: props.selectedUser,
      messages: props.messages,
      events: {
        click: (event: Event) => {
          if ((event.target! as Element).classList.contains('delete-chat')) {
            ChatService.deleteChat(JSON.stringify({ chatId: this.props.currentChat.id }));
          }

          if ((event.target! as Element).classList.contains('add-users')) {
            SearchedUsers.setProps({
              users: [],
              selectedUsers: [],
            });

            PopupAddUsers.setProps({
              isOpened: true,
            });
          }

          if ((event.target! as Element).classList.contains('delete-users')) {
            SearchedUsers.setProps({
              users: [],
              selectedUsers: [],
            });

            ChatService.getChatUsers();

            PopupDeleteUsers.setProps({
              isOpened: true,
            });
          }
        },
      },
    });

    const messages = this.createMessages(props);

    this.children = { ...this.children, messages };
  }

  componentDidUpdate(_: TProps, newProps: TProps): boolean {
    this.children.messages = this.createMessages(newProps);

    return true;
  }

  private createMessages(props: TProps) {
    return props.messages.map((message: Message) => new MessageComponent({
      content: message.content,
      type: message.user_id === props.userId ? 'send' : 'receive',
      time: toDate(message.time),
    }));
  }

  render() {
    return this.compile(template);
  }
}

function mapStateToProps(state: StoreInterface) {
  const { currentChat } = state;

  const { selectedUser } = state;

  if (selectedUser) {
    return {
      isEmptyChat: false,
      selectedUser: state.selectedUser,
      currentChat: null,
      messages: [],
    };
  }

  if (!currentChat && !selectedUser) {
    return {
      isEmptyChat: true,
      selectedUser: null,
      currentChat: null,
      messages: [],
    };
  }

  const chatId = state.currentChat!.id;

  return {
    isEmptyChat: true,
    selectedUser: null,
    currentChat,
    messages: (state.messages as any || {})[chatId] || [],
    userId: state.user!.id,
  };
}

export default connect(Chat, mapStateToProps);
