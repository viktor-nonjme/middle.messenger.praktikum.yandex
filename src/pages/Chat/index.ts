import './index.scss';
import Block from '../../utils/Block';
import EmptyChat from '../../components/EmptyChat';
import Chat from '../../components/Chat';
import { MessagesList } from '../../components/MessagesList';
import { messages, chatMessages } from '../../data';
import template from './index.template';

export class ChatPage extends Block {
  constructor() {
    const messagesList = new MessagesList({ messages });

    const chat = window.location.pathname.startsWith('/id') ? new Chat({ chatMessages }) : new EmptyChat();

    super({
      messagesList,
      chat,
    });
  }

  render() {
    return this.compile(template);
  }
}
