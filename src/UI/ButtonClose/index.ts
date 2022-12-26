import './index.scss';

import template from './index.template';

import closeImg from '../../assets/images/close.svg';

import Block from '../../utils/Block';
import { connect } from '../../utils/connect';

import ChatList from '../../components/ChatList';

import { TProps } from '../../types';

class ButtonClose extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      close: closeImg,
      events: {
        click: () => {
          ChatList.setProps({ isUsers: false, isChats: true });
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}

function mapStateToProps(state: TProps) {
  const { chats } = state;
  return {
    chats,
  };
}

export default connect(ButtonClose, mapStateToProps);
