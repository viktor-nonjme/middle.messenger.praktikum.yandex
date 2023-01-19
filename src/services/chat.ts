import ChatApi from '../api/chat';

import Store from '../utils/Store';
import { toDate } from '../utils/helpers';

import ChatList from '../components/ChatList';

import PopupCreateChat from '../components/PopupCreateChat';
import PopupAddUsers from '../components/PopupAddUsers';
import PopupDeleteUsers from '../components/PopupDeleteUsers';

import SearchedUsers from '../components/SearchedUsers';

import MessagesService from './messages';

import BaseService from './base';

import { TProps } from '../types';

class ChatService extends BaseService {
  constructor() {
    super();
  }

  createChat(data: XMLHttpRequestBodyInit, userId: number[]) {
    this.toggleSpinner(false);

    ChatApi.createChat(data)
      .then(async (result) => {
        if (result.status === 200) {
          this.displayTooltip('success', 'Вы успешно создали чат');

          const chatId = JSON.parse(result.response).id;

          const request = JSON.stringify({ users: [...userId], chatId });

          const { title } = JSON.parse(data as string);

          const chatTitle = userId.length === 1 ? title.split(' connecting... ')[0] : title;

          const isGroupChat = userId.length > 2;

          await this.addUsersToChat(request);

          await this.startChating(chatId, chatTitle, isGroupChat);
        } else {
          const errorReason = JSON.parse(result.responseText).reason;

          this.displayTooltip('warning', `Произошла ошибка: ${errorReason}`);
        }
      })
      .then(() => {
        this.getChats();
      })
      .catch((error) => {
        console.log('error', error);

        this.displayTooltip('warning', 'Произошла ошибка 😔😔');
      })
      .finally(() => {
        this.toggleSpinner(true);
      });
  }

  getChats() {
    ChatApi.getChats()
      .then((result) => {
        if (result.status === 200) {
          const userId = Store.getState().user.id;

          const chatsData = JSON.parse(result.response);

          const chats = this.mapChats(chatsData, userId);

          ChatList.setProps({
            chats,
            isChats: true,
            isUsers: false,
          });

          Store.set('chats', chats);
        }
      })
      .catch((error) => {
        this.displayTooltip('warning', 'Произошла ошибка 😔😔');

        console.log('error', error);
      });
  }

  startChating(chatId: string, chatTitle: string | null, groupChat: boolean) {
    ChatApi.getChatToken(chatId)
      .then(async (result) => {
        if (result.status === 200) {
          const { token } = JSON.parse(result.responseText);

          await MessagesService.connect(Number(chatId), token, '0');

          Store.set('selectedUser', null);

          Store.set('emptyChat', false);

          Store.set('currentChat', {
            id: Number(chatId),
            title: chatTitle,
            avatar: null,
            groupChat,
          });
        }
      })
      .catch((error) => {
        this.displayTooltip('warning', 'Произошла ошибка 😔😔');

        Store.set('emptyChat', true);

        console.log(error);
      });
  }

  getCountNewMessages(chatId: number) {
    ChatApi.getCountNewMessages(String(chatId));
  }

  getCommonChat(chatId: number) {
    ChatApi.getCommonChat(String(chatId))
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  leaveChatPage() {
    Store.set('emptyChat', true);
    Store.set('selectedUser', null);
    Store.set('currentChat', null);
  }

  deleteChat(data: XMLHttpRequestBodyInit) {
    ChatApi.deleteChat(data)
      .then(async (result) => {
        if (result.status === 200) {
          this.displayTooltip('success', 'Вы успешно удалили чат');

          await MessagesService.close();

          Store.set('selectedUser', null);

          Store.set('emptyChat', true);

          Store.set('currentChat', null);
        } else {
          const errorReason = JSON.parse(result.responseText).reason;

          this.displayTooltip('warning', `Произошла ошибка: ${errorReason}`);
        }
      })
      .then(() => {
        this.getChats();
      })
      .catch((error) => {
        this.displayTooltip('warning', 'Произошла ошибка 😔😔');

        console.log('error', error);
      });
  }

  addUsersToChat(data: XMLHttpRequestBodyInit) {
    ChatApi.addUserToChat(data)
      .then((result) => {
        if (result.status === 200) {
          PopupCreateChat.setProps({
            isOpened: false,
          });

          PopupAddUsers.setProps({
            isOpened: false,
          });

          this.displayTooltip('success', 'Чат обновлён или создан');
        } else {
          const errorReason = JSON.parse(result.responseText).reason;

          this.displayTooltip('warning', `Произошла ошибка: ${errorReason}`);
        }
      })
      .catch((error) => {
        console.log(error);

        this.displayTooltip('warning', 'Произошла ошибка 😔😔');
      });
  }

  deleteUsersFromChat(userId: number[]) {
    const chatId = Store.getState().currentChat.id;

    const request = JSON.stringify({ users: [...userId], chatId });

    ChatApi.deleteChatUsers(request)
      .then((result) => {
        if (result.status === 200) {
          PopupDeleteUsers.setProps({
            isOpened: false,
          });

          this.displayTooltip('success', 'Пользовател(ь/и) удалены');
        } else {
          const errorReason = JSON.parse(result.responseText).reason;

          this.displayTooltip('warning', `Произошла ошибка: ${errorReason}`);
        }
      })
      .catch((error) => {
        console.log(error);

        this.displayTooltip('warning', 'Произошла ошибка 😔😔');
      });
  }

  getChatUsers() {
    const chatId = Store.getState().currentChat.id;

    ChatApi.getChatUsers(String(chatId))
      .then((result) => {
        if (result.status === 200) {
          const users = JSON.parse(result.response);

          SearchedUsers.setProps({
            isUsers: true,
            users,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private displayTitle(isCommonChat: boolean, chat: TProps, isCreator: boolean) {
    if (isCommonChat) {
      const [first, second] = chat.title.split(' connecting... ');

      const newTitle = isCreator ? first : second;

      return newTitle;
    }

    return chat.title;
  }

  private mapChats(chats: TProps, userId: number) {
    return chats.map((chat: TProps) => {
      const isCreator = userId === chat.created_by;

      const commonChat = chat.title.includes(' connecting... ');

      const title = this.displayTitle(commonChat, chat, isCreator);

      const lastMessages = chat.last_message;

      delete chat.title;

      delete chat.last_message;

      if (lastMessages) {
        const newTime = toDate(lastMessages.time);

        lastMessages.time = newTime;

        return {
          ...chat,
          title,
          last_message: lastMessages,
        };
      }

      return {
        ...chat,
        title,
        last_message: null,
      };
    });
  }
}

export default new ChatService();
