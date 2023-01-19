import Store from '../utils/Store';
import WSTransport from '../utils/WSTransport';

import ChatService from './chat';

import { WWS_URL } from '../consts/index';

import { Message, StoreInterface } from '../types/index';

class MessagesService {
  socket: WSTransport;

  sockets: { [id: string]: WSTransport } = {};

  async connect(chatId: number, token: string, newMessages: string) {
    await this.close();

    const store = Store.getState() as StoreInterface;

    const userId = store.user!.id;

    this.socket = new WSTransport(`${WWS_URL}/${userId}/${chatId}/${token}`);

    await this.socket.connect();

    this.sockets[chatId] = this.socket;

    this.addEvents(chatId);

    this.getOldMessages(newMessages);
  }

  sendMessage(content: string) {
    this.socket.send({ type: 'message', content });
  }

  getOldMessages(newMessages?: string | undefined) {
    this.socket.send({ type: 'get old', content: newMessages || '0' });
  }

  setMessages(chatId: number, messages: Message | Message[]) {
    let newMessages = [];

    if (Array.isArray(messages)) {
      newMessages = messages.reverse();
    } else {
      newMessages.push(messages);
    }

    const currentMessages = (Store.getState().messages || {})[chatId] || [];

    newMessages = [...currentMessages, ...newMessages];

    Store.set(`messages.${chatId}`, newMessages);

    ChatService.getChats();
  }

  close() {
    const sockets = Object.keys(this.sockets);

    if (sockets.length) {
      sockets.forEach((id: string) => {
        this.sockets[id].close();

        delete this.sockets[id];

        Store.set(`messages.${id}`, []);
      });
    }
  }

  addEvents(chatId: number) {
    this.socket.on('websoket-message', (message: Message | Message[]) => {
      this.setMessages(chatId, message);
    });
    this.socket.on('websoket-closed', () => {
      this.close();
    });
  }
}

export default new MessagesService();
