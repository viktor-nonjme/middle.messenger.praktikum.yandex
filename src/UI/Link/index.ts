import './index.scss';

import template from './index.template';

import Block from '../../utils/Block';
import Router from '../../utils/Router';

import ChatService from '../../services/chat';

export default class Link extends Block {
  constructor(props: { [key: string]: string }) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          Router.go(props.to);
          if (props.to === '/messenger') {
            ChatService.leaveChatPage();
          }
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
