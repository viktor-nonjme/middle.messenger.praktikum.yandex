import ChatApi from '../api/chat';

import Store from '../utils/Store';
import { toDate } from '../utils/helpers';

import Spinner from '../UI/Spinner';
import Tooltip from '../UI/Tooltip';

import ChatList from '../components/ChatList';
import Popup from '../components/Popup';

import MessagesService from './messages';

import { TProps } from '../types';

class ChatService {
  createChat(data: XMLHttpRequestBodyInit, userId: number[]) {
    Spinner.setProps({ isHidden: false });

    ChatApi.createChat(data)
      .then((result) => {
        if (result.status === 200) {
          Tooltip.setProps({ type: 'success', text: 'Вы успешно создали чат' });

          const chatId = JSON.parse(result.response).id;

          const request = JSON.stringify({ users: [...userId], chatId });

          const chatTitle = userId.length === 1 ? JSON.parse(data as string).title.split(' connecting... ')[0] : JSON.parse(data as string).title;

          ChatApi.addUserToChat(request)
            .then((response) => {
              if (response.status === 200) {
                const isGroupChat = userId.length > 2;

                this.startChating(chatId, chatTitle, isGroupChat);

                Popup.setProps({
                  isOpened: false,
                });
              }
            })
            .catch((error) => {
              console.log('error', error);
            });
        } else {
          Tooltip.setProps({ type: 'warning', text: `Произошла ошибка: ${JSON.parse(result.responseText).reason}` });
        }
      })
      .then(() => {
        this.getChats();
      })
      .catch((error) => {
        console.log('error', error);
      })
      .finally(() => {
        Spinner.setProps({ isHidden: true });
      });
  }

  getChats() {
    ChatApi.getChats()
      .then((result) => {
        if (result.status === 200) {
          const userId = Store.getState().user.id;

          const chats = JSON.parse(result.response).map((chat: TProps) => {
            const isCreator = userId === chat.created_by;

            const commotChat = chat.title.includes(' connecting... ');

            const displayTitle = (isCommonChat: boolean) => {
              if (isCommonChat) {
                const [first, second] = chat.title.split(' connecting... ');

                const newTitle = isCreator ? first : second;

                return newTitle;
              }

              return chat.title;
            };

            const title = displayTitle(commotChat);

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

          ChatList.setProps({
            chats,
            isChats: true,
            isUsers: false,
          });

          Store.set('chats', chats);
        }
      })
      .catch((error) => {
        Tooltip.setProps({ type: 'warning', text: 'Произошла ошибка' });

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
      .catch(() => {
        Tooltip.setProps({ type: 'warning', text: 'Произошла ошибка' });

        Store.set('emptyChat', true);
      });
  }

  getCountNewMessages(chatId: number) {
    ChatApi.getCountNewMessages(String(chatId));
  }

  getCommonChat(chatId: number) {
    ChatApi.getCommonChat(String(chatId))
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log('error', error);
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
          Tooltip.setProps({ type: 'success', text: 'Вы успешно удалили чат' });

          await MessagesService.close();

          Store.set('selectedUser', null);

          Store.set('emptyChat', true);

          Store.set('currentChat', null);
        } else {
          Tooltip.setProps({ type: 'warning', text: `Произошла ошибка: ${JSON.parse(result.responseText).reason}` });
        }
      })
      .then(() => {
        this.getChats();
      })
      .catch((error) => {
        Tooltip.setProps({ type: 'warning', text: 'Произошла ошибка' });

        console.log('error', error);
      });
  }
}

export default new ChatService();
