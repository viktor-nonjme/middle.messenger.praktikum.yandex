import './index.scss';

import template from './index.template';

import Block from '../../utils/Block';
import { connect } from '../../utils/connect';

import Chat from '../../components/Chat';
import ChatList from '../../components/ChatList';

import PopupCreateChat from '../../components/PopupCreateChat';
import PopupAddUsers from '../../components/PopupAddUsers';
import PopupDeleteUsers from '../../components/PopupDeleteUsers';

import Link from '../../UI/Link';
import Tooltip from '../../UI/Tooltip';
import InputSearch from '../../UI/InputSearch';
import ColumnResize from '../../UI/ColumnResize';
import Spinner from '../../UI/Spinner';

import { TProps } from '../../types';

class ChatPage extends Block {
  constructor() {
    const link = new Link({
      className: 'messages-list-link',
      to: '/settings',
      title: 'Профиль',
    });

    const chat = new Chat();

    const inputSearch = new InputSearch();

    const columnResize = new ColumnResize();

    super({
      ChatList,
      chat,
      link,
      Tooltip,
      inputSearch,
      columnResize,
      Spinner,
      PopupCreateChat,
      PopupAddUsers,
      PopupDeleteUsers,
    });
  }

  render() {
    return this.compile(template);
  }
}

function mapStateToProps(state: TProps) {
  if (state.chats) {
    const { chats } = state;
    return {
      chats,
    };
  }
  return {
    chats: [],
  };
}

export default connect(ChatPage, mapStateToProps);
